export interface IHomeStats {
  analysisTotal: number;
  IAPresicion: number;
  patients: number;
  reports: number;
}

//Medical dashboard
export interface IResume {
  analysisTotal: number;
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
  accuracyMetrics: IAccuracyMetrics;
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
  resume: IResume;
  analysis: IAnalysis;
}
