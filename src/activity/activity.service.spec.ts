import { Repository } from 'typeorm';
import { ActivityService } from './activity.service';
import { Recent_Activity } from './entities/recent-activity.entity';

describe('ActivityService', () => {
  let service: ActivityService;
  let activityRepository: jest.Mocked<Repository<Recent_Activity>>;

  beforeEach(() => {
    activityRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as jest.Mocked<Repository<Recent_Activity>>;

    service = new ActivityService(activityRepository);
  });

  it('creates an activity mapping userId to relation user.id', async () => {
    const dto = {
      title: 'Reporte mensual generado',
      description: 'desc',
      type: 'Reporte Mensual',
      userId: 'user-1',
    } as any;

    activityRepository.create.mockReturnValue({ id: 'activity-1' } as any);
    activityRepository.save.mockResolvedValue({ id: 'activity-1' } as any);

    await service.create(dto);

    expect(activityRepository.create).toHaveBeenCalledWith({
      ...dto,
      user: { id: 'user-1' },
    });
    expect(activityRepository.save).toHaveBeenCalled();
  });

  it('finds all with defaults and expected query options', async () => {
    activityRepository.find.mockResolvedValue([] as any);

    await service.findAll();

    expect(activityRepository.find).toHaveBeenCalledWith({
      take: 5,
      skip: 0,
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
  });

  it('finds all with custom pagination', async () => {
    activityRepository.find.mockResolvedValue([] as any);

    await service.findAll(10, 20);

    expect(activityRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({ take: 10, skip: 20 }),
    );
  });
});
