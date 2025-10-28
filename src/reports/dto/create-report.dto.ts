import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TYPE_REPORT } from '../constants/data-enum';
import { REPORT_MESSAGES } from '../constants/report-messages';

export class CreateReportDto {
  @IsNotEmpty({ message: REPORT_MESSAGES.NAME_REQUIRED })
  @IsString({ message: REPORT_MESSAGES.NAME_IS_STRING })
  @MaxLength(30, { message: REPORT_MESSAGES.NAME_MAX_LENGTH })
  name: string;

  @IsNotEmpty({ message: REPORT_MESSAGES.TYPE_REPORT_REQUIRED })
  @IsEnum(TYPE_REPORT, { message: REPORT_MESSAGES.TYPE_REPORT_IS_ENUM })
  type: TYPE_REPORT;
}
