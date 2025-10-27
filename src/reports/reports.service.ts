import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor() {}
  create(createReportDto: CreateReportDto) {
    return '';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }
}
