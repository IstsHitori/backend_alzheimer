import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, PatientImages, Image } from './entities';

@Module({
  controllers: [AnalysisController],
  providers: [AnalysisService],
  imports: [TypeOrmModule.forFeature([Analysis, Image, PatientImages])],
})
export class AnalysisModule {}
