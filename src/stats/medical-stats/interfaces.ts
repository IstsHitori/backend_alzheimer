export interface IResume {
  totalAnalysis: number;
  healthyCases: IHealthyCases;
  alzheimerCases: IAlzheimerCases;
  averageAge: number;
  distributionDiagnostic: IDistributionDiagnostic;
}
export interface IDistributionDiagnostic {
  healthy: number;
  lowAlzheimer: number;
  moderateAlzheimer: number;
  severeAlzheimer: number;
}
export interface IHealthyCases {
  cases: number;
  percentaje: number;
}

export interface IAlzheimerCases {
  cases: number;
  percentaje: number;
}

export interface IAnalysis {
  analysisByGender: IAnalysisByGender;
}
export interface IAnalysisByGender {
  male: number;
  female: number;
}

export interface IAccuracyMetrics {
  modelSpecificity: number;
  modelAccuracy: number;
}

export interface IMedicalDashboardStats {
  resumeStats: IResume;
  analysisStats: IAnalysis;
}
