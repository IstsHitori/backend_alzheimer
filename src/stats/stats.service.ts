import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from 'src/reports/entities/report.entity';
import { Analysis, ImageAnalysis } from 'src/analysis/entities';
import { Patient } from 'src/patient/entities';
import {
  IAccuracyMetrics,
  IAnalysis,
  IAnalysisByGender,
  IDistributionDiagnostic,
  IHomeStats,
  IMedicalDashboardStats,
  IResume,
} from './constants';
import { GENDER, RISK_LEVEL } from 'src/patient/constants';

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
    const [analysisTotal, IAPresicion, patients, reports] = await Promise.all([
      this.getAnalysisTotal(),
      this.getAIPresicion(),
      this.getPatientsTotal(),
      this.getReportsTotal(),
    ]);

    return { analysisTotal, IAPresicion, patients, reports };
  }

  async getMedicalDashboardStats(): Promise<IMedicalDashboardStats> {
    const [resume, analysis] = await Promise.all([
      this.getResumeStats(),
      this.getAnalysisStats(),
    ]);

    return { resume, analysis };
  }

  private async getAnalysisTotal(): Promise<number> {
    return await this.analysisRepository.count();
  }

  private async getAIPresicion(): Promise<number> {
    const analyses = await this.imageAnalysisRepository.find();
    if (analyses.length === 0) return 0;

    const totalConfidence = analyses.reduce(
      (total, analysis) => total + analysis.confidenceLevel,
      0,
    );

    return totalConfidence / analyses.length;
  }

  private async getPatientsTotal(): Promise<number> {
    return await this.patientRepository.count();
  }

  private async getReportsTotal(): Promise<number> {
    return await this.reportRepository.count();
  }

  private async getResumeStats(): Promise<IResume> {
    const [analysisTotal, totalCases] = await Promise.all([
      this.getAnalysisTotal(),
      this.patientRepository.find(),
    ]);

    const totalPatients = totalCases.length;
    const distributionDiagnostic = this.getDistributionDiagnostic(totalCases);
    const healthyCases = this.calculateHealthyCases(
      distributionDiagnostic.healthy,
      totalPatients,
    );
    const alzheimerCases = this.calculateAlzheimerCases(
      distributionDiagnostic,
      totalPatients,
    );
    const averageAge = this.calculateAverageAge(totalCases, totalPatients);

    return {
      analysisTotal,
      healthyCases,
      alzheimerCases,
      averageAge,
      distributionDiagnostic,
    };
  }

  private getDistributionDiagnostic(
    patients: Patient[],
  ): IDistributionDiagnostic {
    const countByRiskLevel = (level: RISK_LEVEL) =>
      patients.filter(p => p.riskLevel === level).length;

    return {
      healthy: countByRiskLevel(RISK_LEVEL.HEALTHY),
      lowAlzheimer: countByRiskLevel(RISK_LEVEL.LOW),
      moderateAlzheimer: countByRiskLevel(RISK_LEVEL.MEDIUM),
      severeAlzheimer: countByRiskLevel(RISK_LEVEL.HIGH),
    };
  }

  private calculateHealthyCases(healthy: number, totalPatients: number) {
    return {
      cases: healthy,
      percentaje: totalPatients > 0 ? (healthy / totalPatients) * 100 : 0,
    };
  }

  private calculateAlzheimerCases(
    distribution: IDistributionDiagnostic,
    totalPatients: number,
  ) {
    const alzheimerTotal =
      distribution.lowAlzheimer +
      distribution.moderateAlzheimer +
      distribution.severeAlzheimer;

    return {
      cases: alzheimerTotal,
      percentaje:
        totalPatients > 0 ? (alzheimerTotal / totalPatients) * 100 : 0,
    };
  }

  private calculateAverageAge(
    patients: Patient[],
    totalPatients: number,
  ): number {
    if (totalPatients === 0) return 0;

    const totalAge = patients.reduce((sum, patient) => sum + patient.age, 0);
    return totalAge / totalPatients;
  }

  private async getAnalysisStats(): Promise<IAnalysis> {
    const [analysisByGender, accuracyMetrics] = await Promise.all([
      this.getAnalysisByGender(),
      this.getAccuracyMetrics(),
    ]);

    return { analysisByGender, accuracyMetrics };
  }

  private async getAnalysisByGender(): Promise<IAnalysisByGender> {
    const analyses = await this.analysisRepository.find({
      relations: ['patient'],
    });

    const countByGender = (gender: GENDER) =>
      analyses.filter(analysis => analysis.patient.gender === gender).length;

    return {
      male: countByGender(GENDER.MALE),
      female: countByGender(GENDER.FEMALE),
    };
  }

  private async getAccuracyMetrics(): Promise<IAccuracyMetrics> {
    const [imageAnalyses, analyses, modelAccuracy] = await Promise.all([
      this.imageAnalysisRepository.find(),
      this.analysisRepository.find(),
      this.getAIPresicion(),
    ]);

    const modelSpecificity =
      analyses.length > 0
        ? imageAnalyses.reduce(
            (total, img) => total + img.estimationConfidence,
            0,
          ) / analyses.length
        : 0;

    return { modelSpecificity, modelAccuracy };
  }
}
