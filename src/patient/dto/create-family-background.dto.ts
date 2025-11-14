import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';

export class CreateFamilyBackgroundDto {
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.FAMILY_CONDITION_REQUIRED })
  @IsString({ message: PATIENT_ERROR_MESSAGES.FAMILY_CONDITION_STRING })
  @MaxLength(4, {
    message: PATIENT_ERROR_MESSAGES.FAMILY_CONDITION_MAX_LENGTH,
  })
  code: string;
}
