import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PATIENT_ERROR_MESSAGES } from '../constants';
import { PatientQueryService } from './patient-query.service';

describe('PatientQueryService', () => {
  let service: PatientQueryService;
  let patientRepository: jest.Mocked<Repository<any>>;

  beforeEach(() => {
    patientRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as any;

    service = new PatientQueryService(patientRepository);
  });

  it('findAll formats patient list', async () => {
    patientRepository.find.mockResolvedValue([
      {
        id: 'p1',
        identification: '123',
        telephone: '300',
        fullName: 'Ana',
        birthDate: new Date('2000-01-01'),
        age: 24,
        gender: 'F',
        educationLevel: 'college',
        weight: 60,
        size: 165,
        tension: '120/80',
        eps: { id: 1, entity: 'EPS1', regime: 'Contributivo', code: 'E1' },
        patientConditions: [{ condition: { id: 1, code: 'A00', name: 'C1', description: 'd' } }],
        familyBackgrounds: [{ condition: { id: 2, code: 'B00', name: 'C2', description: 'd2' } }],
        patientCurrentMedications: [
          {
            currentMedication: {
              id: 4,
              expedient: 'X1',
              product: 'P1',
              headline: 'L1',
              pharmaceuticalForm: 'tab',
              viaAdministration: 'oral',
            },
          },
        ],
        symptomsPresent: {
          memoryLoss: true,
          lenguageProblems: false,
          difficultyWithTasks: false,
          disorientation: false,
          personalityChanges: false,
          temporalConfusion: false,
        },
        cognitiveEvaluation: { id: 9, mmse: 20, moca: 22, updatedAt: new Date() },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as any);

    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('personalInfo');
    expect(result[0]).toHaveProperty('physicalData');
    expect(result[0]).toHaveProperty('timestamps');
  });

  it('findOne throws when patient is missing', async () => {
    patientRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toThrow(
      new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND),
    );
  });

  it('findOne formats null optional relations', async () => {
    patientRepository.findOne.mockResolvedValue({
      id: 'p1',
      identification: '123',
      telephone: '300',
      fullName: 'Ana',
      birthDate: new Date('2000-01-01'),
      age: 24,
      gender: 'F',
      educationLevel: 'college',
      weight: 60,
      size: 165,
      tension: '120/80',
      eps: null,
      patientConditions: [],
      familyBackgrounds: [],
      patientCurrentMedications: [],
      symptomsPresent: null,
      cognitiveEvaluation: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    const result = await service.findOne('p1');
    expect(result.eps).toBeNull();
    expect(result.symptoms).toBeNull();
    expect(result.cognitiveEvaluation).toBeNull();
  });
});
