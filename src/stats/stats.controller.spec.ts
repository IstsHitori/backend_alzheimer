import { StatsController } from './stats.controller';

describe('StatsController', () => {
  let controller: StatsController;
  let statsService: {
    getHomeStats: jest.Mock;
    getMedicalDashboardStats: jest.Mock;
  };

  beforeEach(() => {
    statsService = {
      getHomeStats: jest.fn(),
      getMedicalDashboardStats: jest.fn(),
    };

    controller = new StatsController(statsService as any);
  });

  it('delegates getHomeStats', () => {
    controller.getHomeStats();
    expect(statsService.getHomeStats).toHaveBeenCalled();
  });

  it('delegates getMedicalDashboardStats', () => {
    controller.getMedicalDashboardStats();
    expect(statsService.getMedicalDashboardStats).toHaveBeenCalled();
  });
});
