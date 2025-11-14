import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';

export class CreateConditionDto {
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.CONDITION_REQUIRED })
  @IsString({ message: PATIENT_ERROR_MESSAGES.CONDITION_STRING })
  @MaxLength(4, { message: PATIENT_ERROR_MESSAGES.CONDITION_MAX_LENGTH })
  code: string;
}
