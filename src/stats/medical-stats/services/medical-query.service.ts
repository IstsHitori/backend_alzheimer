import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis, ImageAnalysis } from 'src/analysis/entities';
import { Not, Repository } from 'typeorm';
import {
  IAlzheimerCases,
  IAnalysisByGender,
  IDistributionDiagnostic,
  IHealthyCases,
} from '../interfaces';
import { DIAGNOSIS } from 'src/analysis/constants';
import { GENDER } from 'src/patient/constants';
import { MedicalCalculationService } from '.';

@Injectable()
export class MedicalQueryService {
  constructor(
    @InjectRepository(Analysis)
    private readonly analysisRepo: Repository<Analysis>,
    @InjectRepository(ImageAnalysis)
    private readonly imageAnalysisRepo: Repository<ImageAnalysis>,
    private readonly medicalCalculationService: MedicalCalculationService,
  ) {}

  async getTotalAanalysis(): Promise<number> {
    return await this.imageAnalysisRepo.count();
  }

  async getHealthyCasesAndPercentage(): Promise<IHealthyCases> {
    const [healthyCases, totalAnalysis] = await Promise.all([
      this.imageAnalysisRepo.count({
        where: { diagnosis: DIAGNOSIS.NO_DEMENTED },
      }),
      this.getTotalAanalysis(),
    ]);

    return {
      cases: healthyCases,
      percentaje: this.medicalCalculationService.calculatePercentage(
        healthyCases,
        totalAnalysis,
      ),
    };
  }

  async getAlzheimerCasesAndPercentage(): Promise<IAlzheimerCases> {
    const [alzheimerCases, totalAnalysis] = await Promise.all([
      this.imageAnalysisRepo.count({
        where: {
          diagnosis: Not(DIAGNOSIS.NO_DEMENTED),
        },
      }),
      this.getTotalAanalysis(),
    ]);
    return {
      cases: alzheimerCases,
      percentaje: this.medicalCalculationService.calculatePercentage(
        alzheimerCases,
        totalAnalysis,
      ),
    };
  }

  async getDistributionDiagnostic(): Promise<IDistributionDiagnostic> {
    const [lowAlzheimer, moderateAlzheimer, severeAlzheimer, healthyCases] =
      await Promise.all([
        this.getTotalLowAlzheimer(),
        this.getTotalModerateAlzheimer(),
        this.getTotalSevereAlzheimer(),
        this.getHealthyCasesAndPercentage(),
      ]);

    return {
      healthy: healthyCases.cases,
      lowAlzheimer: lowAlzheimer,
      moderateAlzheimer: moderateAlzheimer,
      severeAlzheimer: severeAlzheimer,
    };
  }

  async getTotalAnalysisByGender(): Promise<IAnalysisByGender> {
    const [male, female] = await Promise.all([
      this.getTotalMaleAnalysis(),
      this.getTotalFemaleAnalysis(),
    ]);
    return { male, female };
  }

  private async getTotalLowAlzheimer(): Promise<number> {
    return await this.imageAnalysisRepo.count({
      where: { diagnosis: DIAGNOSIS.VERY_MILD_DEMENTED },
    });
  }

  private async getTotalModerateAlzheimer(): Promise<number> {
    return await this.imageAnalysisRepo.count({
      where: { diagnosis: DIAGNOSIS.MILD_DEMENTED },
    });
  }

  private async getTotalSevereAlzheimer(): Promise<number> {
    return await this.imageAnalysisRepo.count({
      where: { diagnosis: DIAGNOSIS.MODERATE_DEMENTED },
    });
  }

  private async getTotalMaleAnalysis(): Promise<number> {
    return (await this.getAnalysis()).filter(
      analysis => analysis.analysis.patient.gender === GENDER.MALE,
    ).length;
  }

  private async getTotalFemaleAnalysis(): Promise<number> {
    return (await this.getAnalysis()).filter(
      analysis => analysis.analysis.patient.gender === GENDER.FEMALE,
    ).length;
  }

  private async getAnalysis() {
    return await this.imageAnalysisRepo.find({
      relations: ['analysis.patient'],
    });
  }
}
