import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, Image, ImageAnalysis } from './entities';
import { PatientModule } from 'src/patient/patient.module';
import { Patient } from 'src/patient/entities';

@Module({
  controllers: [AnalysisController],
  providers: [AnalysisService],
  imports: [
    TypeOrmModule.forFeature([Analysis, Image, ImageAnalysis, Patient]),
    PatientModule,
  ],
})
export class AnalysisModule {}
