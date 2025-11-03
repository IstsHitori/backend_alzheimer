/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CognitiveEvaluation,
  Condition,
  CurrentMedication,
  FamilyBackgrounds,
  FamilyMember,
  FamilyMemberBackgrounds,
  Patient,
  SymptomsPresent,
} from './entities';
import { PATIENT_ERROR_MESSAGES, PATIENT_SUCCES_MESSAGES } from './constants';
import { ActivityService } from 'src/activity/activity.service';
import { ACTIVITY_TYPE } from 'src/activity/constants/enum-values';
import { UpdateConginitiveEvaluationDto } from './dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(CognitiveEvaluation)
    private readonly cogEvaluationRepository: Repository<CognitiveEvaluation>,
    private readonly activityService: ActivityService,
  ) {}

  async create(createPatientDto: CreatePatientDto, userId: number) {
    const {
      conditions,
      currentMedications,
      familyBackground,
      symptomsPresent,
      ...patientData
    } = createPatientDto;

    // 1. Crear paciente base
    const patient = this.patientRepository.create(patientData);

    // 2. Crear condiciones
    if (conditions?.length) {
      patient.conditions = conditions.map(c =>
        this.patientRepository.manager.create(Condition, c),
      );
    }

    // 3. Crear medicamentos
    if (currentMedications?.length) {
      patient.currentMedications = currentMedications.map(m =>
        this.patientRepository.manager.create(CurrentMedication, m),
      );
    }

    // 4. Crear síntomas
    if (symptomsPresent) {
      patient.symptomsPresent = this.patientRepository.manager.create(
        SymptomsPresent,
        symptomsPresent,
      );
    }

    // 5. Crear antecedentes familiares
    if (familyBackground) {
      const familyBackgroundEntity = this.patientRepository.manager.create(
        FamilyBackgrounds,
        {
          hasAlzheimerFamily: familyBackground.hasAlzheimerFamily,
          hasDementialFamily: familyBackground.hasDementialFamily,
        },
      );

      // Crear los vínculos con miembros
      if (familyBackground.familyMemberBackgrounds?.length) {
        familyBackgroundEntity.familyMemberBackgrounds =
          familyBackground.familyMemberBackgrounds.map(fmb =>
            this.patientRepository.manager.create(FamilyMemberBackgrounds, {
              familyMember: { id: fmb.familyMemberId } as FamilyMember,
            }),
          );
      }

      patient.familyBackground = familyBackgroundEntity;
    }

    // 6. Crear evaluación cognitiva
    patient.cognitiveEvaluation = this.patientRepository.manager.create(
      CognitiveEvaluation,
      {
        mmse: 0,
        moca: 0,
      },
    );

    // 7. Guardar todo

    const activity = {
      title: `Nuevo paciente registrado`,
      description: `${patient.fullName}`,
      type: ACTIVITY_TYPE.CREATE_PATIENT,
      user: {
        id: userId,
      },
    };
    await this.activityService.create(activity);

    await this.patientRepository.save(patient);

    return PATIENT_SUCCES_MESSAGES.PATIENT_CREATED;
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

  async findOne(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: {
        conditions: true,
        currentMedications: true,
        familyBackground: {
          familyMemberBackgrounds: {
            familyMember: true,
          },
        },
        symptomsPresent: true,
        cognitiveEvaluation: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    }

    return this.formatPatient(patient);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto, userId: number) {
    const {
      conditions,
      currentMedications,
      familyBackground,
      symptomsPresent,
      ...patientData
    } = updatePatientDto;

    // Cargar el paciente con todas sus relaciones
    const foundPatient = await this.findOneWithRelations(id);

    // 1. Actualizar datos básicos del paciente
    Object.assign(foundPatient, patientData);

    // 2. Actualizar condiciones (reemplazar completamente)
    if (conditions !== undefined) {
      foundPatient.conditions = conditions.map(c =>
        this.patientRepository.manager.create(Condition, c),
      );
    }

    // 3. Actualizar medicamentos (reemplazar completamente)
    if (currentMedications !== undefined) {
      foundPatient.currentMedications = currentMedications.map(m =>
        this.patientRepository.manager.create(CurrentMedication, m),
      );
    }

    // 4. Actualizar síntomas
    if (symptomsPresent !== undefined) {
      if (foundPatient.symptomsPresent) {
        // Si ya existe, actualizar sus propiedades
        Object.assign(foundPatient.symptomsPresent, symptomsPresent);
      } else {
        // Si no existe, crear nuevo
        foundPatient.symptomsPresent = this.patientRepository.manager.create(
          SymptomsPresent,
          symptomsPresent,
        );
      }
    }

    // 5. Actualizar antecedentes familiares
    if (familyBackground !== undefined) {
      if (foundPatient.familyBackground) {
        // Si ya existe el family background, actualizar
        foundPatient.familyBackground.hasAlzheimerFamily =
          familyBackground.hasAlzheimerFamily ??
          foundPatient.familyBackground.hasAlzheimerFamily;
        foundPatient.familyBackground.hasDementialFamily =
          familyBackground.hasDementialFamily ??
          foundPatient.familyBackground.hasDementialFamily;

        // Actualizar family member backgrounds si se proporcionan
        if (familyBackground.familyMemberBackgrounds !== undefined) {
          foundPatient.familyBackground.familyMemberBackgrounds =
            familyBackground.familyMemberBackgrounds.map(fmb =>
              this.patientRepository.manager.create(FamilyMemberBackgrounds, {
                familyMember: { id: fmb.familyMemberId } as FamilyMember,
              }),
            );
        }
      } else {
        // Si no existe family background, crear uno nuevo
        const familyBackgroundEntity = this.patientRepository.manager.create(
          FamilyBackgrounds,
          {
            hasAlzheimerFamily: familyBackground.hasAlzheimerFamily,
            hasDementialFamily: familyBackground.hasDementialFamily,
          },
        );

        // Agregar family member backgrounds si existen
        if (familyBackground.familyMemberBackgrounds?.length) {
          familyBackgroundEntity.familyMemberBackgrounds =
            familyBackground.familyMemberBackgrounds.map(fmb =>
              this.patientRepository.manager.create(FamilyMemberBackgrounds, {
                familyMember: { id: fmb.familyMemberId } as FamilyMember,
              }),
            );
        }

        foundPatient.familyBackground = familyBackgroundEntity;
      }
    }

    // 6. Guardar todos los cambios (cascade se encarga de las relaciones)
    await this.patientRepository.save(foundPatient);

    const activity = {
      title: `Paciente actualizado`,
      type: ACTIVITY_TYPE.ANALYSIS,
      description: `${patientData.fullName}`,
      user: {
        id: userId,
      },
    };
    await this.activityService.create(activity);
    return PATIENT_SUCCES_MESSAGES.PATIENT_UPDATED;
  }

  async updateCognitiveEvaluation(
    id: number,
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

  async remove(id: number) {
    const foundPatient = await this.findOneWithoutFormat(id);
    await this.patientRepository.remove(foundPatient);
    return PATIENT_SUCCES_MESSAGES.PATIENT_DELETED;
  }

  private async findOneWithoutFormat(id: number) {
    const foundPatient = await this.patientRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundPatient)
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    return foundPatient;
  }

  private async findOneWithRelations(id: number) {
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

  private formatPatient(patient: Patient) {
    return {
      id: patient.id,
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      age: patient.age,
      gender: patient.gender,
      educationLevel: patient.educationLevel,
      riskLevel: patient.riskLevel,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      conditions:
        patient.conditions?.map(c => ({
          id: c.id,
          name: c.name,
        })) ?? [],
      currentMedications:
        patient.currentMedications?.map(m => ({
          id: m.id,
          name: m.name,
        })) ?? [],
      familyBackground: {
        id: patient.familyBackground?.id,
        hasAlzheimerFamily:
          patient.familyBackground?.hasAlzheimerFamily ?? false,
        hasDementialFamily:
          patient.familyBackground?.hasDementialFamily ?? false,
        familyMembers:
          patient.familyBackground?.familyMemberBackgrounds?.map(fmb => ({
            id: fmb.id,
            name: fmb.familyMember.name,
          })) ?? [],
      },
      symptomsPresent: {
        id: patient.symptomsPresent?.id,
        memoryLoss: patient.symptomsPresent?.memoryLoss ?? false,
        lenguageProblems: patient.symptomsPresent?.lenguageProblems ?? false,
        difficultyWithTasks:
          patient.symptomsPresent?.difficultyWithTasks ?? false,
        disorientation: patient.symptomsPresent?.disorientation ?? false,
        personalityChanges:
          patient.symptomsPresent?.personalityChanges ?? false,
        temporalConfusion: patient.symptomsPresent?.temporalConfusion ?? false,
      },
      cognitiveEvaluation: {
        id: patient.cognitiveEvaluation?.id,
        mmse: patient.cognitiveEvaluation?.mmse ?? null,
        moca: patient.cognitiveEvaluation?.moca ?? null,
        updatedAt: patient.cognitiveEvaluation?.updatedAt ?? null,
      },
    };
  }
}
