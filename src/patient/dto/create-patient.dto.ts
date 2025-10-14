import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  EDUCATION_LEVEL,
  GENDER,
  PATIENT_ERROR_MESSAGES,
  RISK_LEVEL,
} from '../constants';
import { Type } from 'class-transformer';
import { CreateConditionDto } from './create-condition.dto';
import { CreateCurrentMedicationDto } from './create-current-medication.dto';
import { CreateFamilyBackgroundDto, CreateSymptomsPresentDto } from '.';

export class CreatePatientDto {
  // Información básica
  @IsString({ message: PATIENT_ERROR_MESSAGES.FULL_NAME_STRING })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.FULL_NAME_REQUIRED })
  fullName: string;

  @IsDate({ message: PATIENT_ERROR_MESSAGES.BIRTH_DATE_REQUIRED })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.BIRTH_DATE_REQUIRED })
  birthDate: Date;

  @IsEnum(GENDER, { message: PATIENT_ERROR_MESSAGES.GENDER_REQUIRED })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.GENDER_REQUIRED })
  gender: GENDER;

  @IsEnum(EDUCATION_LEVEL, {
    message: PATIENT_ERROR_MESSAGES.EDUCATION_LEVEL_REQUIRED,
  })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.EDUCATION_LEVEL_REQUIRED })
  educationLevel: EDUCATION_LEVEL;

  @IsOptional()
  riskLevel?: RISK_LEVEL;

  // Historial Médico
  //Validar que el valor sea un arreglo
  @IsArray({ message: PATIENT_ERROR_MESSAGES.CONDITIONS_ARRAY })
  //Le dice a class-validator que debe validar los objetos anidados dentro de una propiedad
  //{ each: true }: Valida cada elemento del array individualmente
  //Sin esto, class-validator ignoraría las validaciones dentro de los objetos anidados
  @ValidateNested({ each: true })
  //Transforma datos planos (JSON) en instancias de una clase específica
  @Type(() => CreateConditionDto)
  conditions: CreateConditionDto[];

  // Medicamentos actuales
  @IsArray({ message: PATIENT_ERROR_MESSAGES.MEDICATIONS_ARRAY })
  @ValidateNested({ each: true })
  @Type(() => CreateCurrentMedicationDto)
  currentMedications: CreateCurrentMedicationDto[];

  // Antecedentes familiares
  //Propósito: Valida que el valor sea un objeto (no un array, no un primitivo).
  @IsObject({ message: PATIENT_ERROR_MESSAGES.FAMILY_BACKGROUND_OBJECT })
  @ValidateNested()
  @Type(() => CreateFamilyBackgroundDto)
  familyBackground: CreateFamilyBackgroundDto;

  // Síntomas actuales
  @IsObject({ message: PATIENT_ERROR_MESSAGES.SYMPTOMS_OBJECT })
  @ValidateNested()
  @Type(() => CreateSymptomsPresentDto)
  symptomsPresent: CreateSymptomsPresentDto;
}
