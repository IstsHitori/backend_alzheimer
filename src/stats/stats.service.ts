import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from 'src/reports/entities/report.entity';
import { Analysis, ImageAnalysis } from 'src/analysis/entities';
import { Patient } from 'src/patient/entities';
import { IHomeStats } from './constants';

@Injectable()
export class StatsService {
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

  async getHomeStats(): Promise<IHomeStats> {
    //AnalysisToday
    const analysisTotal = await this.getAnaliysisTotal();
    //IA presicion
    const IAPresicion = await this.getAIPresicion();
    //patients
    const patients = await this.getPatientsTotal();
    //reports
    const reports = await this.getReportsTotal();

    return { analysisTotal, IAPresicion, patients, reports };
  }

  private async getAnaliysisTotal(): Promise<number> {
    const analysies = await this.analysisRepository.find();
    return analysies.length;
  }
  private async getAIPresicion(): Promise<number> {
    const analysies = await this.imageAnalysisRepository.find();

    const totalConfidence = analysies.reduce(
      (total, index) => (total += index.confidenceLevel),
      0,
    );

    return totalConfidence / analysies.length;
  }
  private async getPatientsTotal(): Promise<number> {
    const patients = await this.patientRepository.find();
    return patients.length;
  }
  private async getReportsTotal(): Promise<number> {
    const reports = await this.reportRepository.find();
    return reports.length;
  }
}
