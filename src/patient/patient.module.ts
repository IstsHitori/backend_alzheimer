import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition, CurrentMedication, Patient } from './entities';
import { FamilyMember } from './entities/family-member.entity';
import { FamilyMemberBackgrounds } from './entities/family-member-backgrounds.entity';
import { FamilyBackgrounds } from './entities/family-backgrounds.entity';
import { SymptomsPresent } from './entities/symptoms-present.entity';
import { CognitiveEvaluation } from './entities/cognitive-evaluation.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      Condition,
      CurrentMedication,
      FamilyMember,
      FamilyMemberBackgrounds,
      FamilyBackgrounds,
      SymptomsPresent,
      CognitiveEvaluation,
    ]),
    AuthModule,
    ReportsModule,
  ],
})
export class PatientModule {}
