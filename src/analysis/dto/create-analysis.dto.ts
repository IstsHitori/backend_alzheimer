// create-analysis.dto.ts
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageAnalysisDto } from './create-image-analysis.dto';
import { ANALYSIS_ERROR_MESSAGES } from '../constants/error-messages';

export class CreateAnalysisDto {
  @IsUUID('4', { message: ANALYSIS_ERROR_MESSAGES.PATIENT_ID_INVALID })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.PATIENT_ID_REQUIRED })
  patientId: string;

  @IsArray({ message: ANALYSIS_ERROR_MESSAGES.IMAGE_ANALYSES_ARRAY })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.IMAGE_ANALYSES_REQUIRED })
  @ValidateNested({ each: true })
  @Type(() => CreateImageAnalysisDto)
  imageAnalysis: CreateImageAnalysisDto[];
}
