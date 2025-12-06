// update-analysis.dto.ts
import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageAnalysisDto } from './create-image-analysis.dto';
import { ANALYSIS_ERROR_MESSAGES } from '../constants/error-messages';

export class UpdateAnalysisDto {
  @IsOptional()
  @IsUUID('4', { message: ANALYSIS_ERROR_MESSAGES.PATIENT_ID_INVALID })
  patientId?: string;

  @IsOptional()
  @IsArray({ message: ANALYSIS_ERROR_MESSAGES.IMAGE_ANALYSES_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateImageAnalysisDto)
  imageAnalyses?: CreateImageAnalysisDto[];
}
