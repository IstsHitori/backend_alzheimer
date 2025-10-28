import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { REPORT_SUCCESS_MESSAGES } from './constants';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}
  async create(createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto);
    await this.reportRepository.save(report);
    return REPORT_SUCCESS_MESSAGES.REPORT_CREATED;
  }

  async findAll() {
    return await this.reportRepository.find();
  }
}
