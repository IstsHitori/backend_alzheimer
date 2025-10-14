import {
  IsArray,
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EDUCATION_LEVEL,
  GENDER,
  PATIENT_ERROR_MESSAGES,
  RISK_LEVEL,
} from '../constants';
import {
  CreateConditionDto,
  CreateCurrentMedicationDto,
  CreateFamilyBackgroundDto,
  CreateSymptomsPresentDto,
} from '.';

export class UpdatePatientDto {
  // Información básica
  @IsOptional()
  @IsString({ message: PATIENT_ERROR_MESSAGES.FULL_NAME_STRING })
  fullName?: string;

  @IsOptional()
  @IsDate({ message: PATIENT_ERROR_MESSAGES.BIRTH_DATE_REQUIRED })
  birthDate?: Date;

  @IsOptional()
  @IsEnum(GENDER, { message: PATIENT_ERROR_MESSAGES.GENDER_REQUIRED })
  gender?: GENDER;

  @IsOptional()
  @IsEnum(EDUCATION_LEVEL, {
    message: PATIENT_ERROR_MESSAGES.EDUCATION_LEVEL_REQUIRED,
  })
  educationLevel?: EDUCATION_LEVEL;

  @IsOptional()
  riskLevel?: RISK_LEVEL;

  // Historial Médico
  @IsOptional()
  @IsArray({ message: PATIENT_ERROR_MESSAGES.CONDITIONS_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateConditionDto)
  conditions?: CreateConditionDto[];

  // Medicamentos actuales
  @IsOptional()
  @IsArray({ message: PATIENT_ERROR_MESSAGES.MEDICATIONS_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateCurrentMedicationDto)
  currentMedications?: CreateCurrentMedicationDto[];

  // Antecedentes familiares
  @IsOptional()
  @IsObject({ message: PATIENT_ERROR_MESSAGES.FAMILY_BACKGROUND_OBJECT })
  @ValidateNested()
  @Type(() => CreateFamilyBackgroundDto)
  familyBackground?: CreateFamilyBackgroundDto;

  // Síntomas actuales
  @IsOptional()
  @IsObject({ message: PATIENT_ERROR_MESSAGES.SYMPTOMS_OBJECT })
  @ValidateNested()
  @Type(() => CreateSymptomsPresentDto)
  symptomsPresent?: CreateSymptomsPresentDto;
}
