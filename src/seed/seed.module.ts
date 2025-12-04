import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { ExcelParserService } from './helpers/excel-parser.service';
import { FileValidatorService } from './helpers';
import { AdminSeeder, Cie10Seeder, CumSeeder, EpsSeeder } from './seeders';

@Module({
  providers: [
    SeedService,
    ExcelParserService,
    FileValidatorService,
    AdminSeeder,
    Cie10Seeder,
    CumSeeder,
    EpsSeeder,
  ],
  imports: [ConfigModule, CommonModule],
})
export class SeedModule {}
