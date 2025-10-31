import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ACTIVITY_TYPE, ACTIVITY_ERROR_MESSAGES } from '../constants';

export class CreateActivityDto {
  @IsNotEmpty({ message: ACTIVITY_ERROR_MESSAGES.TITLE_REQUIRED })
  @IsString({ message: ACTIVITY_ERROR_MESSAGES.TITLE_MUST_BE_STRING })
  @MaxLength(100, { message: ACTIVITY_ERROR_MESSAGES.TITLE_MAX_LENGTH })
  title: string;

  @IsNotEmpty({ message: ACTIVITY_ERROR_MESSAGES.DESCRIPTION_REQUIRED })
  @IsString({ message: ACTIVITY_ERROR_MESSAGES.DESCRIPTION_MUST_BE_STRING })
  @MaxLength(100, {
    message: ACTIVITY_ERROR_MESSAGES.DESCRIPTION_MAX_LENGTH,
  })
  description: string;

  @IsNotEmpty({ message: ACTIVITY_ERROR_MESSAGES.TYPE_REQUIRED })
  @IsEnum(ACTIVITY_TYPE, { message: ACTIVITY_ERROR_MESSAGES.TYPE_INVALID })
  type: ACTIVITY_TYPE;
}
