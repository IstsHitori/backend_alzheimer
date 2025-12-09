import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { EDUCATION_LEVEL, GENDER, PATIENT_ERROR_MESSAGES } from '../constants';
import { Type } from 'class-transformer';
import { CreateConditionDto } from './create-condition.dto';
import {
  CreateCurrentMedicationDto,
  CreateFamilyBackgroundDto,
  CreateSymptomsPresentDto,
} from '.';

export class CreatePatientDto {
  // Información básica

  @IsString({ message: PATIENT_ERROR_MESSAGES.IDENTIFICATION_STRING })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.IDENTIFICATION_REQUIRED })
  @Length(6, 10, { message: PATIENT_ERROR_MESSAGES.IDENTIFICATION_LENGTH })
  identification: string;

  @IsString({ message: PATIENT_ERROR_MESSAGES.TELEPHONE_STRING })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.TELEPHONE_REQUIRED })
  @Length(10, 10, { message: PATIENT_ERROR_MESSAGES.TELEPHONE_LENGTH })
  telephone: string;

  @IsString({ message: PATIENT_ERROR_MESSAGES.FULL_NAME_STRING })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.FULL_NAME_REQUIRED })
  fullName: string;

  @IsDate({ message: PATIENT_ERROR_MESSAGES.BIRTH_DATE_REQUIRED })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.BIRTH_DATE_REQUIRED })
  birthDate: Date;

  @IsInt({ message: PATIENT_ERROR_MESSAGES.WEIGHT_NUMBER })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.WEIGHT_REQUIRED })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.WEIGHT_MIN })
  weight: number;

  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.SIZE_DECIMAL })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.SIZE_REQUIRED })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.SIZE_MIN })
  size: number;

  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.TENSION_DECIMAL })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.TENSION_REQUIRED })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.TENSION_MIN })
  tension: number;

  @IsEnum(GENDER, { message: PATIENT_ERROR_MESSAGES.GENDER_REQUIRED })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.GENDER_REQUIRED })
  gender: GENDER;

  @IsEnum(EDUCATION_LEVEL, {
    message: PATIENT_ERROR_MESSAGES.EDUCATION_LEVEL_REQUIRED,
  })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.EDUCATION_LEVEL_REQUIRED })
  educationLevel: EDUCATION_LEVEL;

  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.EPS_NUMBER })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.EPS_REQUIRED })
  eps: number;

  // Historial Médico
  //Validar que el valor sea un arregl
  @IsArray({ message: PATIENT_ERROR_MESSAGES.CONDITIONS_ARRAY })
  //Le dice a class-validator que debe validar los objetos anidados dentro de una propiedad
  //{ each: true }: Valida cada elemento del array individualmente
  //Sin esto, class-validator ignoraría las validaciones dentro de los objetos anidados
  @ValidateNested({ each: true })
  //Transforma datos planos (JSON) en instancias de una clase específica
  @Type(() => CreateConditionDto)
  conditions: CreateConditionDto[];

  //Medicamentos actuales
  @IsArray({ message: PATIENT_ERROR_MESSAGES.CURRENT_MEDICATION_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateCurrentMedicationDto)
  currentMedications: CreateCurrentMedicationDto[];

  // Antecedentes familiares
  @IsArray({ message: PATIENT_ERROR_MESSAGES.FAMILY_BACKGROUND_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateFamilyBackgroundDto)
  familyBackground: CreateFamilyBackgroundDto[];

  // Síntomas actuales
  //Propósito: Valida que el valor sea un objeto (no un array, no un primitivo).
  @IsObject({ message: PATIENT_ERROR_MESSAGES.SYMPTOMS_OBJECT })
  @ValidateNested()
  @Type(() => CreateSymptomsPresentDto)
  symptomsPresent: CreateSymptomsPresentDto;
}
