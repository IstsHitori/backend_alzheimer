import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition, Patient } from './entities';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [TypeOrmModule.forFeature([Patient, Condition])],
})
export class PatientModule {}
