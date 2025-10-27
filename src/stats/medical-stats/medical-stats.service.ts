import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis, ImageAnalysis } from 'src/analysis/entities';
import { Patient } from 'src/patient/entities';
import { Repository } from 'typeorm';
import {
  IAnalysis,
  IDistributionDiagnostic,
  IMedicalDashboardStats,
  IResume,
} from './interfaces';
import { GENDER, RISK_LEVEL } from 'src/patient/constants';

@Injectable()
export class MedicalStatsService {
  constructor(
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Analysis) private analysisRepo: Repository<Analysis>,
    @InjectRepository(ImageAnalysis)
    private imageRepo: Repository<ImageAnalysis>,
  ) {}

  async getStats(): Promise<IMedicalDashboardStats> {
    const [resume, analysis] = await Promise.all([
      this.getResumeStats(),
      this.getAnalysisStats(),
    ]);
    return { resume, analysis };
  }

  private async getResumeStats(): Promise<IResume> {
    const patients = await this.patientRepo.find();
    const analysisTotal = await this.analysisRepo.count();
    const total = patients.length;

    const distribution = this.getDistribution(patients);
    const healthy = this.percent(distribution.healthy, total);
    const alzheimer = this.percent(
      distribution.lowAlzheimer +
        distribution.moderateAlzheimer +
        distribution.severeAlzheimer,
      total,
    );
    const averageAge =
      total > 0 ? patients.reduce((sum, p) => sum + p.age, 0) / total : 0;

    return {
      analysisTotal,
      healthyCases: { cases: distribution.healthy, percentaje: healthy },
      alzheimerCases: {
        cases:
          distribution.lowAlzheimer +
          distribution.moderateAlzheimer +
          distribution.severeAlzheimer,
        percentaje: alzheimer,
      },
      averageAge,
      distributionDiagnostic: distribution,
    };
  }

  private getDistribution(patients: Patient[]): IDistributionDiagnostic {
    const count = (level: RISK_LEVEL) =>
      patients.filter(p => p.riskLevel === level).length;
    return {
      healthy: count(RISK_LEVEL.HEALTHY),
      lowAlzheimer: count(RISK_LEVEL.LOW),
      moderateAlzheimer: count(RISK_LEVEL.MEDIUM),
      severeAlzheimer: count(RISK_LEVEL.HIGH),
    };
  }

  private percent(value: number, total: number): number {
    return total > 0 ? (value / total) * 100 : 0;
  }

  private async getAnalysisStats(): Promise<IAnalysis> {
    const analyses = await this.analysisRepo.find({ relations: ['patient'] });
    const images = await this.imageRepo.find();
    const modelAccuracy = this.calculateModelAccuracy(images);
    const modelSpecificity =
      analyses.length > 0
        ? images.reduce((sum, img) => sum + img.estimationConfidence, 0) /
          analyses.length
        : 0;

    const male = analyses.filter(a => a.patient.gender === GENDER.MALE).length;
    const female = analyses.filter(
      a => a.patient.gender === GENDER.FEMALE,
    ).length;

    return {
      analysisByGender: { male, female },
      accuracyMetrics: { modelAccuracy, modelSpecificity },
    };
  }

  private calculateModelAccuracy(images: ImageAnalysis[]): number {
    if (images.length === 0) return 0;
    const total = images.reduce((sum, img) => sum + img.confidenceLevel, 0);
    return total / images.length;
  }
}
