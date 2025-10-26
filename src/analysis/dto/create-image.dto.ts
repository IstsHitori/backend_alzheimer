import { IsNotEmpty, IsString } from 'class-validator';
import { ANALYSIS_ERROR_MESSAGES } from '../constants/error-messages';

export class CreateImageDto {
  @IsString({ message: ANALYSIS_ERROR_MESSAGES.IMAGE_URL_STRING })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.IMAGE_URL_REQUIRED })
  imageUrl: string;

  @IsString({ message: ANALYSIS_ERROR_MESSAGES.FILE_NAME_STRING })
  @IsNotEmpty({ message: ANALYSIS_ERROR_MESSAGES.FILE_NAME_REQUIRED })
  fileName: string;
}
