import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition, CurrentMedications, Eps } from 'src/patient/entities';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Eps, CurrentMedications, Condition]),
  ],
})
export class CatalogModule {}
