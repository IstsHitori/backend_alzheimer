import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ActivityModule } from 'src/activity/activity.module';
import { Recent_Activity } from 'src/activity/entities/recent-activity.entity';
import {
  CognitiveEvaluation,
  Condition,
  CurrentMedications,
  Eps,
  FamilyBackgrounds,
  Patient,
  PatientCondition,
  PatientCurrentMedications,
  SymptomsPresent,
} from './entities';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      Condition,
      FamilyBackgrounds,
      SymptomsPresent,
      CognitiveEvaluation,
      Eps,
      PatientCondition,
      CurrentMedications,
      PatientCurrentMedications,
      Recent_Activity,
    ]),
    AuthModule,
    ActivityModule,
  ],
})
export class PatientModule {}
