import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLE } from 'src/user/constants';

@Auth(ROLE.ADMIN, ROLE.DOCTOR)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('home-stats')
  getHomeStats() {
    return this.statsService.getHomeStats();
  }
  @Get('medical-dashboard-stats')
  getMedicalDashboardStats() {
    return this.statsService.getMedicalDashboardStats();
  }
}
