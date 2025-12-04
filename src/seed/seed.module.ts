import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition, CurrentMedications } from 'src/patient/entities';

@Module({
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([CurrentMedications, Condition]),
    ConfigModule,
    CommonModule,
  ],
})
export class SeedModule {}
