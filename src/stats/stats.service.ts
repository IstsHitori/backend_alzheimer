import { Injectable } from '@nestjs/common';
import { HomeStatsService } from './home-stats/home-stats.service';
import { MedicalStatsService } from './medical-stats/medical-stats.service';
import { IMedicalDashboardStats } from './medical-stats/interfaces';
import { IHomeStats } from './home-stats/interfaces';

@Injectable()
export class StatsService {
  constructor(
    private readonly homeStats: HomeStatsService,
    private readonly medicalStats: MedicalStatsService,
  ) {}
  async getHomeStats(): Promise<IHomeStats> {
    return this.homeStats.getStats();
  }

  async getMedicalDashboardStats(): Promise<IMedicalDashboardStats> {
    return this.medicalStats.getStats();
  }
}
