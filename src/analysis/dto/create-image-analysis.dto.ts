import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DIAGNOSIS } from '../constants';
import { ANALYSIS_ERROR_MESSAGES } from '../constants/error-messages';

export class CreateImageAnalysisDto {
  @IsString({ message: ANALYSIS_ERROR_MESSAGES.IMAGE_URL_STRING })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.IMAGE_URL_REQUIRED })
  imageUrl: string;

  @IsString({ message: ANALYSIS_ERROR_MESSAGES.FILE_NAME_STRING })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.FILE_NAME_REQUIRED })
  fileName: string;

  @IsEnum(DIAGNOSIS, { message: ANALYSIS_ERROR_MESSAGES.DIAGNOSIS_VALID })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.DIAGNOSIS_REQUIRED })
  diagnosis: DIAGNOSIS;

  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.CONFIDENCE_LEVEL_NUMBER })
  @Min(0, { message: ANALYSIS_ERROR_MESSAGES.CONFIDENCE_LEVEL_MIN })
  @Max(100, { message: ANALYSIS_ERROR_MESSAGES.CONFIDENCE_LEVEL_MAX })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.CONFIDENCE_LEVEL_REQUIRED })
  confidenceLevel: number;

  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.MMSE_ESTIMATED_NUMBER })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.MMSE_ESTIMATED_REQUIRED })
  mmseEstimated: number;

  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.MOCA_ESTIMATED_NUMBER })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.MOCA_ESTIMATED_REQUIRED })
  mocaEstimated: number;

  @IsNumber(
    {},
    { message: ANALYSIS_ERROR_MESSAGES.ESTIMATION_CONFIDENCE_NUMBER },
  )
  @IsNotEmpty({
    message: ANALYSIS_ERROR_MESSAGES.ESTIMATION_CONFIDENCE_REQUIRED,
  })
  estimationConfidence: number;

  @IsString({ message: ANALYSIS_ERROR_MESSAGES.ESTIMATION_NOTE_STRING })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.ESTIMATION_NOTE_REQUIRED })
  estimationNote: string;

  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.BRAIN_VOLUME_NUMBER })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.BRAIN_VOLUME_REQUIRED })
  brainVolume: number;

  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.HIPPOCAMPUS_VOLUME_NUMBER })
  @IsNotEmpty({
    message: ANALYSIS_ERROR_MESSAGES.HIPPOCAMPUS_VOLUME_REQUIRED,
  })
  hippocampusVolume: number;

  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.CORTICAL_THICKNESS_NUMBER })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.CORTICAL_THICKNESS_REQUIRED })
  corticalThickness: number;

  @IsNumber(
    {},
    { message: ANALYSIS_ERROR_MESSAGES.WHITE_MATTER_LESIONS_NUMBER },
  )
  @IsNotEmpty({
    message: ANALYSIS_ERROR_MESSAGES.WHITE_MATTER_LESIONS_REQUIRED,
  })
  whiteMatterLesions: number;

  @IsNumber(
    {},
    { message: ANALYSIS_ERROR_MESSAGES.DEVIATION_FROM_NORMAL_NUMBER },
  )
  @IsNotEmpty({
    message: ANALYSIS_ERROR_MESSAGES.DEVIATION_FROM_NORMAL_REQUIRED,
  })
  deviationFromNormal: number;

  @IsArray({ message: ANALYSIS_ERROR_MESSAGES.RISK_FACTORS_ARRAY })
  @IsString({
    each: true,
    message: ANALYSIS_ERROR_MESSAGES.RISK_FACTORS_STRING,
  })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.RISK_FACTORS_REQUIRED })
  riskFactors: string[];

  @IsArray({ message: ANALYSIS_ERROR_MESSAGES.MEDICAL_RECOMMENDATIONS_ARRAY })
  @IsString({
    each: true,
    message: ANALYSIS_ERROR_MESSAGES.MEDICAL_RECOMMENDATIONS_STRING,
  })
  @IsNotEmpty({
    message: ANALYSIS_ERROR_MESSAGES.MEDICAL_RECOMMENDATIONS_REQUIRED,
  })
  medicalRecommendations: string[];
}
