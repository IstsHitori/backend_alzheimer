import {
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

  @Min(0, { message: ANALYSIS_ERROR_MESSAGES.NON_DEMENTED_MIN })
  @Max(100, { message: ANALYSIS_ERROR_MESSAGES.NON_DEMENTED_MAX })
  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.NON_DEMENTED_NUMBER })
  nonDemented: number;

  @Min(0, { message: ANALYSIS_ERROR_MESSAGES.VERY_MILD_DEMENTED_MIN })
  @Max(100, { message: ANALYSIS_ERROR_MESSAGES.VERY_MILD_DEMENTED_MAX })
  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.VERY_MILD_DEMENTED_NUMBER })
  veryMildDemented: number;

  @Min(0, { message: ANALYSIS_ERROR_MESSAGES.MILD_DEMENTED_MIN })
  @Max(100, { message: ANALYSIS_ERROR_MESSAGES.MILD_DEMENTED_MAX })
  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.MILD_DEMENTED_NUMBER })
  mildDemented: number;

  @Min(0, { message: ANALYSIS_ERROR_MESSAGES.MODERATE_DEMENTED_MIN })
  @Max(100, { message: ANALYSIS_ERROR_MESSAGES.MODERATE_DEMENTED_MAX })
  @IsNumber({}, { message: ANALYSIS_ERROR_MESSAGES.MODERATE_DEMENTED_NUMBER })
  moderateDemented: number;
}
