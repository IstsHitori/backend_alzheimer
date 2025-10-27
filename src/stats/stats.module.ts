import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, ImageAnalysis } from 'src/analysis/entities';
import { Patient } from 'src/patient/entities';
import { Report } from 'src/reports/entities/report.entity';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Analysis, Patient, ImageAnalysis, Report]),
  ],
})
export class StatsModule {}
