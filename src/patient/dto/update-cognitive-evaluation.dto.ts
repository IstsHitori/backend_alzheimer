import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';

export class UpdateConginitiveEvaluationDto {
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.MMSE_REQUIRED })
  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.MMSE_NUMBER })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.MMSE_MIN })
  @Max(30, { message: PATIENT_ERROR_MESSAGES.MMSE_MAX })
  mmse: number;

  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.MOCA_REQUIRED })
  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.MOCA_NUMBER })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.MOCA_MIN })
  @Max(30, { message: PATIENT_ERROR_MESSAGES.MOCA_MAX })
  moca: number;
}
