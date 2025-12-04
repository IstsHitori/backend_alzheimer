import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class PatientQueryService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rawResults;
  }
}
