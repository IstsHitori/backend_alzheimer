import { REGIME } from 'src/patient/constants';

export interface CIE10 {
  code: string;
  name: string;
  description: string;
  extra: string;
}
export interface CUM {
  expedient: number;
  product: string;
  headline: string;
  healthRegistry: string;
  commercialDescription: string;
  medicalSample: string;
  atc: string;
  descriptionAtc: string;
  viaAdministration: string;
  unitMeasurement: string;
  quantity: number;
  referenceUnit: string;
  pharmaceuticalForm: string;
}

export interface EpsData {
  entity: string;
  code: string;
  mobilityCode: string;
  nit: number;
  regime: REGIME;
}
