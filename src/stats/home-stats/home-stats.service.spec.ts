import { Repository } from 'typeorm';
import { HomeStatsService } from './home-stats.service';

describe('HomeStatsService', () => {
  it('returns dashboard stats combining repositories', async () => {
    const analysisRepository = { count: jest.fn().mockResolvedValue(12) } as unknown as Repository<any>;
    const patientRepository = { count: jest.fn().mockResolvedValue(8) } as unknown as Repository<any>;
    const reportRepository = { count: jest.fn().mockResolvedValue(4) } as unknown as Repository<any>;

    const service = new HomeStatsService(
      analysisRepository,
      patientRepository,
      reportRepository,
    );

    await expect(service.getStats()).resolves.toEqual({
      analysisTotal: 12,
      patients: 8,
      reports: 4,
      IAPresicion: 0.93,
    });
  });
});
