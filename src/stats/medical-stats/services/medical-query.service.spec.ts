import { Not, Repository } from 'typeorm';
import { DIAGNOSIS } from 'src/analysis/constants';
import { GENDER } from 'src/patient/constants';
import { MedicalCalculationService } from './medical-calculation.service';
import { MedicalQueryService } from './medical-query.service';

describe('MedicalQueryService', () => {
  let imageAnalysisRepo: jest.Mocked<Repository<any>>;
  let analysisRepo: jest.Mocked<Repository<any>>;
  let medicalCalculationService: jest.Mocked<MedicalCalculationService>;
  let service: MedicalQueryService;

  beforeEach(() => {
    imageAnalysisRepo = {
      count: jest.fn(),
      find: jest.fn(),
    } as any;
    analysisRepo = {} as any;
    medicalCalculationService = {
      calculatePercentage: jest.fn(),
      calculateAverageAge: jest.fn(),
      calculateModelAccuracy: jest.fn(),
    } as any;

    service = new MedicalQueryService(
      analysisRepo,
      imageAnalysisRepo,
      medicalCalculationService,
    );
  });

  it('returns total analysis count', async () => {
    imageAnalysisRepo.count.mockResolvedValue(12);

    await expect(service.getTotalAanalysis()).resolves.toBe(12);
  });

  it('returns healthy cases and percentage', async () => {
    imageAnalysisRepo.count.mockResolvedValueOnce(8).mockResolvedValueOnce(10);
    medicalCalculationService.calculatePercentage.mockReturnValue(80);

    await expect(service.getHealthyCasesAndPercentage()).resolves.toEqual({
      cases: 8,
      percentaje: 80,
    });

    expect(imageAnalysisRepo.count).toHaveBeenNthCalledWith(1, {
      where: { diagnosis: DIAGNOSIS.NO_DEMENTED },
    });
    expect(medicalCalculationService.calculatePercentage).toHaveBeenCalledWith(8, 10);
  });

  it('returns alzheimer cases and percentage', async () => {
    imageAnalysisRepo.count.mockResolvedValueOnce(4).mockResolvedValueOnce(10);
    medicalCalculationService.calculatePercentage.mockReturnValue(40);

    await expect(service.getAlzheimerCasesAndPercentage()).resolves.toEqual({
      cases: 4,
      percentaje: 40,
    });

    expect(imageAnalysisRepo.count).toHaveBeenNthCalledWith(1, {
      where: { diagnosis: Not(DIAGNOSIS.NO_DEMENTED) },
    });
  });

  it('returns distribution diagnostic', async () => {
    imageAnalysisRepo.count
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(10);
    medicalCalculationService.calculatePercentage.mockReturnValue(40);

    await expect(service.getDistributionDiagnostic()).resolves.toEqual({
      healthy: 4,
      lowAlzheimer: 2,
      moderateAlzheimer: 3,
      severeAlzheimer: 1,
    });
  });

  it('returns analysis by gender', async () => {
    imageAnalysisRepo.find.mockResolvedValue([
      { analysis: { patient: { gender: GENDER.MALE } } },
      { analysis: { patient: { gender: GENDER.FEMALE } } },
      { analysis: { patient: { gender: GENDER.FEMALE } } },
    ] as any);

    await expect(service.getTotalAnalysisByGender()).resolves.toEqual({
      male: 1,
      female: 2,
    });

    expect(imageAnalysisRepo.find).toHaveBeenCalledWith({
      relations: ['analysis.patient'],
    });
  });
});
