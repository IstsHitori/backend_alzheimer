import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recent_Activity } from './entities/recent-activity.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  imports: [TypeOrmModule.forFeature([Recent_Activity, User]), AuthModule],
  exports: [ActivityService],
})
export class ActivityModule {}
