import { IsNotEmpty, IsString } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';

export class CreateConditionDto {
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.CONDITION_REQUIRED })
  @IsString({ message: PATIENT_ERROR_MESSAGES.CONDITION_STRING })
  name: string = 'prueba';
}
