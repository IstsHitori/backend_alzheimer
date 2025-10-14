import { IsNotEmpty, IsNumber } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants';

export class CreateFamilyMemberBackgroundDto {
  @IsNumber({}, { message: PATIENT_ERROR_MESSAGES.FAMILY_MEMBER_NUMBER })
  @IsNotEmpty({ message: PATIENT_ERROR_MESSAGES.FAMILY_MEMBER_REQUIRED })
  familyMemberId: number;
}
