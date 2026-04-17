import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ACTIVITY_TYPE } from 'src/activity/constants';
import { ActivityService } from 'src/activity/activity.service';
import { PATIENT_ERROR_MESSAGES, PATIENT_SUCCES_MESSAGES } from './constants';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;
  let patientRepository: jest.Mocked<Repository<any>>;
  let cogEvaluationRepository: jest.Mocked<Repository<any>>;
  let patientPersistenceService: { createPatientTransaction: jest.Mock; updatePatientTransaction: jest.Mock };
  let patientQueryService: { findAll: jest.Mock; findOne: jest.Mock };
  let activityService: jest.Mocked<ActivityService>;

  beforeEach(() => {
    patientRepository = { findOne: jest.fn(), remove: jest.fn() } as any;
    cogEvaluationRepository = { save: jest.fn() } as any;
    patientPersistenceService = {
      createPatientTransaction: jest.fn(),
      updatePatientTransaction: jest.fn(),
    };
    patientQueryService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };
    activityService = { create: jest.fn() } as any;

    service = new PatientService(
      patientRepository,
      cogEvaluationRepository,
      patientPersistenceService as any,
      patientQueryService as any,
      activityService,
    );
  });

  it('creates patient and activity', async () => {
    patientPersistenceService.createPatientTransaction.mockResolvedValue({ fullName: 'Ana' });
    activityService.create.mockResolvedValue({} as any);

    await expect(service.create({} as any, 'u-1')).resolves.toBe('Paciente creado');

    expect(activityService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Paciente creado',
        type: ACTIVITY_TYPE.CREATE_PATIENT,
        userId: 'u-1',
      }),
    );
  });

  it('findAll delegates to query service', async () => {
    patientQueryService.findAll.mockResolvedValue([{ id: 'p-1' }]);
    await expect(service.findAll()).resolves.toEqual([{ id: 'p-1' }]);
  });

  it('findOne delegates to query service', async () => {
    patientQueryService.findOne.mockResolvedValue({ id: 'p-1' });
    await expect(service.findOne('p-1')).resolves.toEqual({ id: 'p-1' });
  });

  it('updates patient and creates activity', async () => {
    patientRepository.findOne.mockResolvedValue({ id: 'p-1', fullName: 'Ana' } as any);
    patientPersistenceService.updatePatientTransaction.mockResolvedValue(undefined);
    activityService.create.mockResolvedValue({} as any);

    const dto = {
      fullName: 'Ana2',
      eps: 1,
      conditions: [{ code: 'A00' }],
      currentMedications: [{ expedient: 'X1' }],
      familyBackground: [{ code: 'A00' }],
      symptomsPresent: { memoryLoss: true },
    } as any;

    await expect(service.update('p-1', dto, 'u-1')).resolves.toBe(
      PATIENT_SUCCES_MESSAGES.PATIENT_UPDATED,
    );

    expect(patientPersistenceService.updatePatientTransaction).toHaveBeenCalled();
    expect(activityService.create).toHaveBeenCalled();
  });

  it('updateCognitiveEvaluation throws when patient does not exist', async () => {
    patientRepository.findOne.mockResolvedValue(null);

    await expect(service.updateCognitiveEvaluation('p-404', {} as any)).rejects.toThrow(
      new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND),
    );
  });

  it('updateCognitiveEvaluation throws when cognitive evaluation does not exist', async () => {
    patientRepository.findOne.mockResolvedValue({ id: 'p-1', cognitiveEvaluation: null } as any);

    await expect(service.updateCognitiveEvaluation('p-1', {} as any)).rejects.toThrow(
      new NotFoundException(PATIENT_ERROR_MESSAGES.COG_EVALUATION_NOT_FOUND),
    );
  });

  it('updateCognitiveEvaluation saves cognitive evaluation', async () => {
    patientRepository.findOne.mockResolvedValue({
      id: 'p-1',
      cognitiveEvaluation: { mmse: 0, moca: 0 },
    } as any);
    cogEvaluationRepository.save.mockResolvedValue({} as any);

    await expect(
      service.updateCognitiveEvaluation('p-1', { mmse: 10, moca: 12 } as any),
    ).resolves.toBe(PATIENT_SUCCES_MESSAGES.EVALUTAION_COG_UPDATED);
  });

  it('remove deletes patient', async () => {
    patientRepository.findOne.mockResolvedValue({ id: 'p-1' } as any);
    patientRepository.remove.mockResolvedValue({ id: 'p-1' } as any);

    await expect(service.remove('p-1')).resolves.toBe(
      PATIENT_SUCCES_MESSAGES.PATIENT_DELETED,
    );
  });
});
