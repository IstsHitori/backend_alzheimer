import { MedicalStatsService } from './medical-stats.service';

describe('MedicalStatsService', () => {
  it('builds dashboard stats from query and calculation services', async () => {
    const medicalQueryService = {
      getTotalAanalysis: jest.fn().mockResolvedValue(30),
      getHealthyCasesAndPercentage: jest.fn().mockResolvedValue({ total: 20, percentage: 66.7 }),
      getAlzheimerCasesAndPercentage: jest.fn().mockResolvedValue({ total: 10, percentage: 33.3 }),
      getDistributionDiagnostic: jest.fn().mockResolvedValue([{ diagnostic: 'AD', total: 10 }]),
      getTotalAnalysisByGender: jest.fn().mockResolvedValue([{ gender: 'F', total: 18 }]),
    };

    const medicalCalculationService = {
      calculateAverageAge: jest.fn().mockResolvedValue(74),
    };

    const service = new MedicalStatsService(
      medicalQueryService as any,
      medicalCalculationService as any,
    );

    await expect(service.getStats()).resolves.toEqual({
      resumeStats: {
        totalAnalysis: 30,
        healthyCases: { total: 20, percentage: 66.7 },
        alzheimerCases: { total: 10, percentage: 33.3 },
        averageAge: 74,
        distributionDiagnostic: [{ diagnostic: 'AD', total: 10 }],
      },
      analysisStats: {
        analysisByGender: [{ gender: 'F', total: 18 }],
      },
    });
  });
});
