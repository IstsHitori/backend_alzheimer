import { StatsService } from './stats.service';

describe('StatsService', () => {
  it('returns home stats from HomeStatsService', async () => {
    const homeStats = {
      getStats: jest.fn().mockResolvedValue({ analysisTotal: 10 }),
    };
    const medicalStats = {
      getStats: jest.fn(),
    };

    const service = new StatsService(homeStats as any, medicalStats as any);

    await expect(service.getHomeStats()).resolves.toEqual({ analysisTotal: 10 });
    expect(homeStats.getStats).toHaveBeenCalled();
  });

  it('returns medical dashboard stats from MedicalStatsService', async () => {
    const homeStats = {
      getStats: jest.fn(),
    };
    const medicalStats = {
      getStats: jest.fn().mockResolvedValue({ resumeStats: {}, analysisStats: {} }),
    };

    const service = new StatsService(homeStats as any, medicalStats as any);

    await expect(service.getMedicalDashboardStats()).resolves.toEqual({
      resumeStats: {},
      analysisStats: {},
    });
    expect(medicalStats.getStats).toHaveBeenCalled();
  });
});
