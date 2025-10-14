import { IsNotEmpty, IsString } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';

export class CreateCurrentMedicationDto {
  @IsString({ message: PATIENT_ERROR_MESSAGES.MEDICATION_STRING })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.MEDICATION_REQUIRED })
  name: string;
}
