import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  CognitiveEvaluation,
  Condition,
  CurrentMedications,
  FamilyBackgrounds,
  Patient,
  PatientCondition,
  PatientCurrentMedications,
  SymptomsPresent,
} from './entities';
import { PATIENT_ERROR_MESSAGES, PATIENT_SUCCES_MESSAGES } from './constants';
import { ActivityService } from 'src/activity/activity.service';
import { UpdateConginitiveEvaluationDto } from './dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(CognitiveEvaluation)
    private readonly cogEvaluationRepository: Repository<CognitiveEvaluation>,
    @InjectRepository(PatientCondition)
    private readonly patientCondRepository: Repository<PatientCondition>,
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
    private readonly activityService: ActivityService,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    {
      conditions,
      currentMedications,
      familyBackground,
      symptomsPresent,
      ...patientData
    }: CreatePatientDto,
    userId: string,
  ) {
    const queryRunner = await this.createTransactionConnection();
    try {
      //1-Crear paciente
      const patient = queryRunner.manager.create(Patient, patientData);

      const savedPatient = await queryRunner.manager.save(Patient, patient);

      //2-Crear las condiciones
      const patientConditionsEntities = await this.createPatientConditions(
        conditions,
        savedPatient.id,
        queryRunner,
      );
      await queryRunner.manager.save(
        PatientCondition,
        patientConditionsEntities,
      );

      //3-Crear los medicamentos actuales
      const patientCurrentMedicationsEntities =
        await this.createPatientCurrentMedications(
          currentMedications,
          savedPatient.id,
          queryRunner,
        );
      await queryRunner.manager.save(
        PatientCurrentMedications,
        patientCurrentMedicationsEntities,
      );

      //4-Crear condiciones de antecedentes familiares
      const patientFamilyBackgroundsEntities =
        await this.createPatientFamilyBackgrounds(
          familyBackground,
          savedPatient.id,
          queryRunner,
        );
      await queryRunner.manager.save(
        FamilyBackgrounds,
        patientFamilyBackgroundsEntities,
      );

      //5-crear y guardar symptomsPresent
      await this.createAndSavePatientSymptomsPresent(
        symptomsPresent,
        savedPatient.id,
        queryRunner,
      );
    } catch (error) {
      //Si tenemos algún error. hacemos rollback de la transacción
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      //Necesitamos liberar el query runner creado manualmente
      await queryRunner.release();
    }

    //Guardar datos
    return '';
  }

  async findAll() {
    const rawResults = await this.patientRepository
      .createQueryBuilder('p')
      .leftJoin('p.conditions', 'c')
      .leftJoin('p.currentMedications', 'cm')
      .leftJoin('p.familyBackground', 'fb')
      .leftJoin('fb.familyMemberBackgrounds', 'fmb')
      .leftJoin('fmb.familyMember', 'fm')
      .leftJoin('p.symptomsPresent', 'sp')
      .leftJoin('p.cognitiveEvaluation', 'ce')
      .select([
        'p.id AS id',
        'p.fullName AS "fullName"',
        'p.birthDate AS "birthDate"',
        'p.age AS age',
        'p.gender AS gender',
        'p.educationLevel AS "educationLevel"',
        'p.riskLevel AS "riskLevel"',
        'p.createdAt AS "createdAt"',
        'p.updatedAt AS "updatedAt"',
        'fb.hasAlzheimerFamily AS "hasAlzheimerFamily"',
        'fb.hasDementialFamily AS "hasDementialFamily"',
        'sp.memoryLoss AS "memoryLoss"',
        'sp.lenguageProblems AS "lenguageProblems"',
        'sp.difficultyWithTasks AS "difficultyWithTasks"',
        'sp.disorientation AS disorientation',
        'sp.personalityChanges AS "personalityChanges"',
        'sp.temporalConfusion AS "temporalConfusion"',
        'ce.mmse AS mmse',
        'ce.moca AS moca',
        'ce.updatedAt AS "cognitiveUpdatedAt"',
        "STRING_AGG(DISTINCT c.name, ', ') AS condiciones",
        "STRING_AGG(DISTINCT cm.name, ', ') AS medicamentos",
        "STRING_AGG(DISTINCT fm.name::text, ', ') AS familiares",
      ])
      .groupBy(
        `p.id, p.fullName, p.birthDate, p.age, p.gender, p.educationLevel, p.riskLevel,
       p.createdAt, p.updatedAt,
       fb.hasAlzheimerFamily, fb.hasDementialFamily,
       sp.memoryLoss, sp.lenguageProblems, sp.difficultyWithTasks,
       sp.disorientation, sp.personalityChanges, sp.temporalConfusion,
       ce.mmse, ce.moca, ce.updatedAt`,
      )
      .getRawMany();

    return rawResults.map(p => ({
      id: p.id,
      fullName: p.fullName,
      birthDate: p.birthDate,
      age: p.age,
      gender: p.gender,
      educationLevel: p.educationLevel,
      riskLevel: p.riskLevel,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      familyBackground: {
        hasAlzheimerFamily: p.hasAlzheimerFamily ?? false,
        hasDementialFamily: p.hasDementialFamily ?? false,
        familyMembers: p.familiares
          ? p.familiares.split(', ').filter(Boolean)
          : [],
      },
      symptomsPresent: {
        memoryLoss: p.memoryLoss ?? false,
        lenguageProblems: p.lenguageProblems ?? false,
        difficultyWithTasks: p.difficultyWithTasks ?? false,
        disorientation: p.disorientation ?? false,
        personalityChanges: p.personalityChanges ?? false,
        temporalConfusion: p.temporalConfusion ?? false,
      },
      cognitiveEvaluation: {
        mmse: p.mmse ?? null,
        moca: p.moca ?? null,
        updatedAt: p.cognitiveUpdatedAt ?? null,
      },
      conditions: p.condiciones
        ? p.condiciones.split(', ').filter(Boolean)
        : [],
      medications: p.medicamentos
        ? p.medicamentos.split(', ').filter(Boolean)
        : [],
    }));
  }

  findOne(id: Patient['id']) {
    return '';
  }

  update(
    id: Patient['id'],
    updatePatientDto: UpdatePatientDto,
    userId: string,
  ) {
    return PATIENT_SUCCES_MESSAGES.PATIENT_UPDATED;
  }

  async updateCognitiveEvaluation(
    id: string,
    updateCognitiveEvaluation: UpdateConginitiveEvaluationDto,
  ) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['cognitiveEvaluation'],
    });

    if (!patient) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    }

    if (!patient.cognitiveEvaluation) {
      throw new NotFoundException(
        PATIENT_ERROR_MESSAGES.COG_EVALUATION_NOT_FOUND,
      );
    }

    Object.assign(patient.cognitiveEvaluation, updateCognitiveEvaluation);
    await this.cogEvaluationRepository.save(patient.cognitiveEvaluation);
    return PATIENT_SUCCES_MESSAGES.EVALUTAION_COG_UPDATED;
  }

  async remove(id: Patient['id']) {
    const foundPatient = await this.findOneWithoutFormat(id);
    await this.patientRepository.remove(foundPatient);
    return PATIENT_SUCCES_MESSAGES.PATIENT_DELETED;
  }

  //---Auxiliar functions
  private async findOneWithoutFormat(id: string) {
    const foundPatient = await this.patientRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundPatient)
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    return foundPatient;
  }

  private async findOneWithRelations(id: string) {
    const foundPatient = await this.patientRepository.findOne({
      where: { id },
      relations: [
        'conditions',
        'currentMedications',
        'familyBackground',
        'familyBackground.familyMemberBackgrounds',
        'symptomsPresent',
        'cognitiveEvaluation',
      ],
    });

    if (!foundPatient) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    }

    return foundPatient;
  }

  private async createPatientConditions(
    conditions: CreatePatientDto['conditions'],
    patientId: Patient['id'],
    queryRunner: QueryRunner,
  ) {
    const patientConditionsEntities = await Promise.all(
      conditions.map(async condition => {
        const foundCondition = await queryRunner.manager.findOne(Condition, {
          where: { code: condition.code },
        });
        if (!foundCondition)
          throw new NotFoundException(
            `Condición médica con código:${condition.code} no encontada`,
          );

        return queryRunner.manager.create(PatientCondition, {
          patient: { id: patientId },
          condition: { id: foundCondition.id },
        });
      }),
    );

    return patientConditionsEntities;
  }

  private async createPatientCurrentMedications(
    currentMedications: CreatePatientDto['currentMedications'],
    patientId: Patient['id'],
    queryRunner: QueryRunner,
  ) {
    const currentMedicationsEntities = await Promise.all(
      currentMedications.map(async medication => {
        const foundMedication = await queryRunner.manager.findOne(
          CurrentMedications,
          { where: { expedient: medication.expedient } },
        );
        if (!foundMedication)
          throw new NotFoundException(
            `Medicamento con expediente:${medication.expedient} no encontrado`,
          );

        return queryRunner.manager.create(PatientCurrentMedications, {
          patient: { id: patientId },
          currentMedication: { id: foundMedication.id },
        });
      }),
    );
    return currentMedicationsEntities;
  }

  private async createPatientFamilyBackgrounds(
    familyBackground: CreatePatientDto['familyBackground'],
    patientId: Patient['id'],
    queryRunner: QueryRunner,
  ) {
    const patientFamilyBackgroundsEntities = Promise.all(
      familyBackground.map(async condition => {
        const foundCondition = await queryRunner.manager.findOne(Condition, {
          where: { code: condition.code },
        });
        if (!foundCondition)
          throw new NotFoundException(
            `Condición médica con código:${condition.code} no encontada`,
          );

        return queryRunner.manager.create(FamilyBackgrounds, {
          patient: { id: patientId },
          condition: { id: foundCondition.id },
        });
      }),
    );

    return patientFamilyBackgroundsEntities;
  }

  private async createAndSavePatientSymptomsPresent(
    symptomsPresent: CreatePatientDto['symptomsPresent'],
    patientId: Patient['id'],
    queryRunner: QueryRunner,
  ) {
    const patientSymptomsPresentEntity = queryRunner.manager.create(
      SymptomsPresent,
      { ...symptomsPresent, patient: { id: patientId } },
    );
    await queryRunner.manager.save(
      SymptomsPresent,
      patientSymptomsPresentEntity,
    );
  }

  private async createTransactionConnection() {
    //Crear el queryRunner para la transacción
    const queryRunner = this.dataSource.createQueryRunner();
    //Establecemos una conexión a la BD con el queryRunner
    await queryRunner.connect();
    //Abrimos una transacción
    await queryRunner.startTransaction();

    return queryRunner;
  }
}
