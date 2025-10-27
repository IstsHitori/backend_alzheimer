import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis, ImageAnalysis } from 'src/analysis/entities';
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
    @InjectRepository(ImageAnalysis)
    private readonly imageAnalysisRepository: Repository<ImageAnalysis>,
  ) {}

  async getStats(): Promise<IHomeStats> {
    const [analysisTotal, patients, reports, IAPresicion] = await Promise.all([
      this.analysisRepository.count(),
      this.patientRepository.count(),
      this.reportRepository.count(),
      this.calculateIAPrecision(),
    ]);

    return { analysisTotal, patients, reports, IAPresicion };
  }

  private async calculateIAPrecision(): Promise<number> {
    const images = await this.imageAnalysisRepository.find();
    if (images.length === 0) return 0;
    const total = images.reduce((sum, img) => sum + img.confidenceLevel, 0);
    return total / images.length;
  }
}
