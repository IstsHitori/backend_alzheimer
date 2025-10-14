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

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
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
        'p.gender AS gender',
        'p.educationLevel AS "educationLevel"',
        'p.riskLevel AS "riskLevel"',
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
        "STRING_AGG(DISTINCT c.name, ', ') AS condiciones",
        "STRING_AGG(DISTINCT cm.name, ', ') AS medicamentos",
        "STRING_AGG(DISTINCT fm.name::text, ', ') AS familiares",
      ])
      .groupBy(
        `p.id, p.fullName, p.birthDate, p.gender, p.educationLevel, p.riskLevel,
       fb.hasAlzheimerFamily, fb.hasDementialFamily,
       sp.memoryLoss, sp.lenguageProblems, sp.difficultyWithTasks,
       sp.disorientation, sp.personalityChanges, sp.temporalConfusion,
       ce.mmse, ce.moca`,
      )
      .getRawMany();

    return rawResults.map(p => ({
      id: p.id,
      fullName: p.fullName,
      birthDate: p.birthDate,
      gender: p.gender,
      educationLevel: p.educationLevel,
      riskLevel: p.riskLevel,
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
    if (!patient)
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);

    return this.formatPatient(patient);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
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

  private formatPatient(patient: Patient) {
    return {
      id: patient.id,
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      gender: patient.gender,
      educationLevel: patient.educationLevel,
      riskLevel: patient.riskLevel,
      familyBackground: {
        hasAlzheimerFamily:
          patient.familyBackground?.hasAlzheimerFamily ?? false,
        hasDementialFamily:
          patient.familyBackground?.hasDementialFamily ?? false,
        familyMembers:
          patient.familyBackground?.familyMemberBackgrounds?.map(
            fmb => fmb.familyMember.name,
          ) ?? [],
      },
      symptomsPresent: {
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
        mmse: patient.cognitiveEvaluation?.mmse ?? null,
        moca: patient.cognitiveEvaluation?.moca ?? null,
      },
      conditions: patient.conditions?.map(c => c.name) ?? [],
      medications: patient.currentMedications?.map(cm => cm.name) ?? [],
    };
  }
}
