import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Repository } from 'typeorm';
import { Analysis } from 'src/analysis/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Analysis)
    private readonly analysisRepository: Repository<Analysis>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}
  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }
  getHomeStats() {}

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
