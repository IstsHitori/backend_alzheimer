import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { REPORT_SUCCESS_MESSAGES, TYPE_REPORT } from './constants';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityService } from 'src/activity/activity.service';
import { ACTIVITY_TYPE } from 'src/activity/constants/enum-values';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly activityService: ActivityService,
  ) {}
  async create(createReportDto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(createReportDto);

    const activity = this.createActivityByReport(createReportDto, user);

    await this.activityService.create(activity);

    await this.reportRepository.save(report);
    return REPORT_SUCCESS_MESSAGES.REPORT_CREATED;
  }

  async findAll() {
    return await this.reportRepository.find();
  }

  private createActivityByReport(createReportDto: CreateReportDto, user: User) {
    if (createReportDto.type === TYPE_REPORT.MONTHLY_REPORT)
      return {
        title: `${createReportDto.type} generado`,
        description: `Se ha generado un nuevo reporte mensual por:${user.name}`,
        type: ACTIVITY_TYPE.MONTHLY_REPORT,
        user: {
          id: user.id,
        },
      };
    if (createReportDto.type === TYPE_REPORT.ANALYSIS_REPORT)
      return {
        title: `${createReportDto.type} generado`,
        description: `Se ha generado un nuevo reporte de analisis por:${user.name}`,
        type: ACTIVITY_TYPE.ANALYSIS_REPORT,
        user: {
          id: user.id,
        },
      };
    return {
      title: `${createReportDto.type} generado`,
      description: `Se ha generado un nuevo reporte de usuario por:${user.name}`,
      type: ACTIVITY_TYPE.USER_REPORT,
      user: {
        id: user.id,
      },
    };
  }
}
