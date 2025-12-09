import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EDUCATION_LEVEL, GENDER, PATIENT_ERROR_MESSAGES } from '../constants';
import {
  CreateConditionDto,
  CreateCurrentMedicationDto,
  CreateFamilyBackgroundDto,
  CreateSymptomsPresentDto,
} from '.';

export class UpdatePatientDto {
  // Información básica

  @IsOptional()
  @IsString({ message: PATIENT_ERROR_MESSAGES.IDENTIFICATION_STRING })
  @Length(6, 10, { message: PATIENT_ERROR_MESSAGES.IDENTIFICATION_LENGTH })
  identification?: string;

  @IsOptional()
  @IsString({ message: PATIENT_ERROR_MESSAGES.TELEPHONE_STRING })
  @Length(10, 10, { message: PATIENT_ERROR_MESSAGES.TELEPHONE_LENGTH })
  telephone?: string;

  @IsOptional()
  @IsString({ message: PATIENT_ERROR_MESSAGES.FULL_NAME_STRING })
  fullName?: string;

  @IsOptional()
  @IsDate({ message: PATIENT_ERROR_MESSAGES.BIRTH_DATE_REQUIRED })
  birthDate?: Date;

  @IsOptional()
  @IsInt({ message: PATIENT_ERROR_MESSAGES.WEIGHT_NUMBER })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.WEIGHT_MIN })
  weight?: number;

  @IsOptional()
  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.SIZE_DECIMAL })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.SIZE_MIN })
  size?: number;

  @IsOptional()
  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.TENSION_DECIMAL })
  @Min(0, { message: PATIENT_ERROR_MESSAGES.TENSION_MIN })
  tension?: number;

  @IsOptional()
  @IsEnum(GENDER, { message: PATIENT_ERROR_MESSAGES.GENDER_REQUIRED })
  gender?: GENDER;

  @IsOptional()
  @IsEnum(EDUCATION_LEVEL, {
    message: PATIENT_ERROR_MESSAGES.EDUCATION_LEVEL_REQUIRED,
  })
  educationLevel?: EDUCATION_LEVEL;

  @IsOptional()
  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.EPS_NUMBER })
  eps: number;

  // Historial Médico
  @IsOptional()
  @IsArray({ message: PATIENT_ERROR_MESSAGES.CONDITIONS_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateConditionDto)
  conditions?: CreateConditionDto[];

  // Medicamentos actuales
  @IsOptional()
  @IsArray({ message: PATIENT_ERROR_MESSAGES.CURRENT_MEDICATION_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateCurrentMedicationDto)
  currentMedications?: CreateCurrentMedicationDto[];

  // Antecedentes familiares
  @IsOptional()
  @IsArray({ message: PATIENT_ERROR_MESSAGES.FAMILY_BACKGROUND_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateFamilyBackgroundDto)
  familyBackground?: CreateFamilyBackgroundDto[];

  // Síntomas actuales
  @IsOptional()
  @IsObject({ message: PATIENT_ERROR_MESSAGES.SYMPTOMS_OBJECT })
  @ValidateNested()
  @Type(() => CreateSymptomsPresentDto)
  symptomsPresent?: CreateSymptomsPresentDto;
}
