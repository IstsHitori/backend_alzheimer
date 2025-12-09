import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities';
import { Repository } from 'typeorm';
import { PATIENT_ERROR_MESSAGES } from '../constants';

@Injectable()
export class PatientQueryService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findAll() {
    const patients = await this.patientRepository.find({
      relations: [
        'eps',
        'cognitiveEvaluation',
        'patientConditions.condition',
        'familyBackgrounds.condition',
        'patientCurrentMedications.currentMedication',
        'symptomsPresent',
      ],
    });
    return this.formatFindAllPatientResponse(patients);
  }

  async findOne(id: Patient['id']) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: [
        'eps',
        'cognitiveEvaluation',
        'patientConditions.condition',
        'familyBackgrounds.condition',
        'patientCurrentMedications.currentMedication',
        'symptomsPresent',
        'analysis.imageAnalysis',
      ],
    });

    if (!patient)
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);

    return this.formatPatientResponse(patient);
  }

  private formatPatientResponse(patient: Patient) {
    return {
      id: patient.id,
      personalInfo: {
        identification: patient.identification,
        telephone: patient.telephone,
        fullName: patient.fullName,
        birthDate: patient.birthDate,
        age: patient.age,
        gender: patient.gender,
        educationLevel: patient.educationLevel,
      },
      physicalData: {
        weight: patient.weight,
        size: patient.size,
        tension: patient.tension,
      },
      eps: patient.eps
        ? {
            id: patient.eps.id,
            entity: patient.eps.entity,
            regime: patient.eps.regime,
            code: patient.eps.code,
          }
        : null,
      currentConditions: patient.patientConditions.map(pc => ({
        id: pc.condition.id,
        code: pc.condition.code,
        name: pc.condition.name,
        description: pc.condition.description,
      })),
      familyBackgrounds: patient.familyBackgrounds.map(fb => ({
        id: fb.condition.id,
        code: fb.condition.code,
        name: fb.condition.name,
        description: fb.condition.description,
      })),
      currentMedications: patient.patientCurrentMedications.map(pcm => ({
        id: pcm.currentMedication.id,
        expedient: pcm.currentMedication.expedient,
        product: pcm.currentMedication.product,
        laboratory: pcm.currentMedication.headline,
        pharmaceuticalForm: pcm.currentMedication.pharmaceuticalForm,
        administrationRoute: pcm.currentMedication.viaAdministration,
      })),
      symptoms: patient.symptomsPresent
        ? {
            memoryLoss: patient.symptomsPresent.memoryLoss,
            lenguageProblems: patient.symptomsPresent.lenguageProblems,
            difficultyWithTasks: patient.symptomsPresent.difficultyWithTasks,
            disorientation: patient.symptomsPresent.disorientation,
            personalityChanges: patient.symptomsPresent.personalityChanges,
            temporalConfusion: patient.symptomsPresent.temporalConfusion,
          }
        : null,
      cognitiveEvaluation: patient.cognitiveEvaluation
        ? {
            id: patient.cognitiveEvaluation.id,
            mmse: patient.cognitiveEvaluation.mmse,
            moca: patient.cognitiveEvaluation.moca,
            updatedAt: patient.cognitiveEvaluation.updatedAt,
          }
        : null,
      timestamps: {
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
      },
    };
  }

  private formatFindAllPatientResponse(patients: Patient[]) {
    return patients.map(patient => this.formatPatientResponse(patient));
  }
}
