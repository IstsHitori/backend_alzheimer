import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis } from 'src/analysis/entities';
import { Patient } from 'src/patient/entities';
import { Report } from 'src/reports/entities/report.entity';
import { Repository } from 'typeorm';
import { IHomeStats } from './interfaces';

@Injectable()
export class HomeStatsService {
  constructor(
    @InjectRepository(Analysis)
    private readonly analysisRepository: Repository<Analysis>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async getStats(): Promise<IHomeStats> {
    const [analysisTotal, patients, reports] = await Promise.all([
      this.analysisRepository.count(),
      this.patientRepository.count(),
      this.reportRepository.count(),
    ]);

    return {
      analysisTotal,
      patients,
      reports,
      IAPresicion: this.calculateIAPrecision(),
    };
  }

  private calculateIAPrecision(): number {
    return 0.93;
  }
}
