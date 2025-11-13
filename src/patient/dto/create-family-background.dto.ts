import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';

export class CreateFamilyBackgroundDto {
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.FAMILY_MEDICATION_REQUIRED })
  @IsString({ message: PATIENT_ERROR_MESSAGES.FAMILY_MEDICATION_STRING })
  @MaxLength(10, {
    message: PATIENT_ERROR_MESSAGES.FAMILY_MEDICATION_MAX_LENGTH,
  })
  expedient: string;
}
