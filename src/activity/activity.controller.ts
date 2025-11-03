import { Controller, Get, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Auth()
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.activityService.findAll(limit, offset);
  }
}
