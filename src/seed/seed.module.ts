import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [SeedService],
  imports: [ConfigModule, CommonModule],
})
export class SeedModule {}
