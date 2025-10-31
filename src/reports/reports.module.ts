import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ActivityModule } from 'src/activity/activity.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    TypeOrmModule.forFeature([Report, User]),
    AuthModule,
    ActivityModule,
  ],
  exports: [ReportsService],
})
export class ReportsModule {}
