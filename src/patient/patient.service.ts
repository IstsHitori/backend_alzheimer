/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CognitiveEvaluation, Patient } from './entities';
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
    private readonly activityService: ActivityService,
  ) {}

  create(createPatientDto: CreatePatientDto, userId: string) {
    console.log(createPatientDto);
    const newPatient = this.patientRepository.create();
    return newPatient;
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

  findOne(id: string) {
    return '';
  }

  update(id: string, updatePatientDto: UpdatePatientDto, userId: string) {
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

  async remove(id: string) {
    const foundPatient = await this.findOneWithoutFormat(id);
    await this.patientRepository.remove(foundPatient);
    return PATIENT_SUCCES_MESSAGES.PATIENT_DELETED;
  }

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

  private formatPatient(patient: Patient) {}
}
