import { Injectable } from '@nestjs/common';
import { IAnalysis, IMedicalDashboardStats, IResume } from './interfaces';
import { MedicalCalculationService, MedicalQueryService } from './services';

@Injectable()
export class MedicalStatsService {
  constructor(
    private readonly medicalQueryService: MedicalQueryService,
    private readonly medicalCalculationService: MedicalCalculationService,
  ) {}

  async getStats(): Promise<IMedicalDashboardStats> {
    const [resumeStats, analysisStats] = await Promise.all([
      this.getResumeStats(),
      this.getAnalysisStats(),
    ]);
    return { resumeStats, analysisStats };
  }

  private async getResumeStats(): Promise<IResume> {
    const [
      totalAnalysis,
      healthyCasesAndPercentaje,
      alzheimerCasesAndPercentage,
      averageAge,
      distributionDiagnostic,
    ] = await Promise.all([
      this.medicalQueryService.getTotalAanalysis(),
      this.medicalQueryService.getHealthyCasesAndPercentage(),
      this.medicalQueryService.getAlzheimerCasesAndPercentage(),
      this.medicalCalculationService.calculateAverageAge(),
      this.medicalQueryService.getDistributionDiagnostic(),
    ]);

    return {
      totalAnalysis,
      healthyCases: healthyCasesAndPercentaje,
      alzheimerCases: alzheimerCasesAndPercentage,
      averageAge,
      distributionDiagnostic,
    };
  }

  private async getAnalysisStats(): Promise<IAnalysis> {
    const analysisByGender =
      await this.medicalQueryService.getTotalAnalysisByGender();
    return { analysisByGender };
  }
}
