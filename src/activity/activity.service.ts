import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Repository } from 'typeorm';
import { Recent_Activity } from './entities/recent-activity.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Recent_Activity)
    private readonly activityRepository: Repository<Recent_Activity>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    const recent_activity = this.activityRepository.create(createActivityDto);

    return await this.activityRepository.save(recent_activity);
  }

  async findAll(limit: number = 5, offset: number = 0) {
    return await this.activityRepository.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
      relations: ['user'],
      select: {
        user: {
          id: true,
          name: true,
          userName: true,
          role: true,
        },
      },
    });
  }
}
