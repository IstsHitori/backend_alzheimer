import { IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';
import { Type } from 'class-transformer';
import { CreateFamilyMemberBackgroundDto } from '.';

export class CreateFamilyBackgroundDto {
  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.HAS_ALZHEIMER_BOOLEAN })
  hasAlzheimerFamily: boolean;

  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.HAS_DEMENTIAL_BOOLEAN })
  hasDementialFamily: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFamilyMemberBackgroundDto)
  familyMemberBackgrounds: CreateFamilyMemberBackgroundDto[];
}
