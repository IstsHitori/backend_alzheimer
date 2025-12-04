import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { CreatePatientDto } from '../dto';
import {
  CognitiveEvaluation,
  FamilyBackgrounds,
  Patient,
  PatientCondition,
  PatientCurrentMedications,
  SymptomsPresent,
} from '../entities';
import { PatientValidatorService } from './patient-validator.service';

@Injectable()
export class PatientPersistenceService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly validator: PatientValidatorService,
  ) {}

  async createPatientTransaction({
    eps,
    conditions,
    currentMedications,
    familyBackground,
    symptomsPresent,
    ...restPatient
  }: CreatePatientDto): Promise<Patient> {
    return await this.dataSource.transaction(async manager => {
      //Validate that the patient exists
      await this.validator.validatePatientExistence(
        restPatient.identification,
        manager,
      );

      const foundEps = await this.validator.findEpsById(eps, manager);

      //Create patient and save patient
      const newPatient = manager.create(Patient, {
        ...restPatient,
        eps: {
          id: foundEps.id,
        },
      });
      const savedPatient = await manager.save(Patient, newPatient);

      //
      const patientConditionEntities = await this.createPatientConditions(
        conditions,
        savedPatient.id,
        manager,
      );
      const patientMedicationEntities =
        await this.createPatientCurrentMedications(
          currentMedications,
          savedPatient.id,
          manager,
        );
      const patientFamilyBgEntities = await this.createPatientFamilyBackgrounds(
        familyBackground,
        savedPatient.id,
        manager,
      );
      await this.createAndSavePatientSymptomsPresent(
        symptomsPresent,
        savedPatient.id,
        manager,
      );

      await this.createAndSavePatientCognitiveEvaluation(
        savedPatient.id,
        manager,
      );

      await manager.save(PatientCondition, patientConditionEntities);
      await manager.save(PatientCurrentMedications, patientMedicationEntities);
      await manager.save(FamilyBackgrounds, patientFamilyBgEntities);

      return savedPatient;
    });
  }

  private async createPatientConditions(
    conditions: CreatePatientDto['conditions'],
    patientId: Patient['id'],
    manager: EntityManager,
  ) {
    return await Promise.all(
      conditions.map(async condition => {
        const foundCondition = await this.validator.getValidCondition(
          condition.code,
          manager,
        );

        return manager.create(PatientCondition, {
          patient: { id: patientId },
          condition: { id: foundCondition.id },
        });
      }),
    );
  }

  private async createPatientCurrentMedications(
    currentMedications: CreatePatientDto['currentMedications'],
    patientId: Patient['id'],
    manager: EntityManager,
  ) {
    const currentMedicationsEntities = await Promise.all(
      currentMedications.map(async medication => {
        const foundMedication = await this.validator.getValidMedication(
          medication.expedient,
          manager,
        );

        return manager.create(PatientCurrentMedications, {
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
    manager: EntityManager,
  ) {
    const patientFamilyBackgroundsEntities = Promise.all(
      familyBackground.map(async condition => {
        const foundCondition = await this.validator.getValidCondition(
          condition.code,
          manager,
        );

        return manager.create(FamilyBackgrounds, {
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
    manager: EntityManager,
  ) {
    const patientSymptomsPresentEntity = manager.create(SymptomsPresent, {
      ...symptomsPresent,
      patient: { id: patientId },
    });
    await manager.save(SymptomsPresent, patientSymptomsPresentEntity);
  }

  private async createAndSavePatientCognitiveEvaluation(
    patientId: Patient['id'],
    manager: EntityManager,
  ) {
    const cogEvaluation = manager.create(CognitiveEvaluation, {
      mmse: 0,
      moca: 0,
      patient: { id: patientId },
    });

    await manager.save(CognitiveEvaluation, cogEvaluation);
  }
}
