import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Analysis, ImageAnalysis } from 'src/analysis/entities';
import { Patient } from 'src/patient/entities';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    TypeOrmModule.forFeature([Report, Analysis, Patient, ImageAnalysis]),
    AuthModule,
  ],
})
export class ReportsModule {}
