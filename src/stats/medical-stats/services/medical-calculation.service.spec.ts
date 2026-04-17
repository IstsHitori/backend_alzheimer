import { Repository } from 'typeorm';
import { MedicalCalculationService } from './medical-calculation.service';

describe('MedicalCalculationService', () => {
  let patientRepo: jest.Mocked<Repository<any>>;
  let service: MedicalCalculationService;

  beforeEach(() => {
    patientRepo = {
      find: jest.fn(),
    } as any;
    service = new MedicalCalculationService(patientRepo);
  });

  it('calculates percentage when total is greater than zero', () => {
    expect(service.calculatePercentage(2, 8)).toBe(25);
  });

  it('returns zero percentage when total is zero', () => {
    expect(service.calculatePercentage(2, 0)).toBe(0);
  });

  it('calculates average age for patients', async () => {
    patientRepo.find.mockResolvedValue([{ age: 60 }, { age: 80 }] as any);

    await expect(service.calculateAverageAge()).resolves.toBe(70);
  });

  it('returns zero average age when there are no patients', async () => {
    patientRepo.find.mockResolvedValue([] as any);

    await expect(service.calculateAverageAge()).resolves.toBe(0);
  });

  it('returns fixed model accuracy value', () => {
    expect(service.calculateModelAccuracy()).toBe(0.93);
  });
});
