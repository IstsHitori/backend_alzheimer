import { Repository } from 'typeorm';
import { ACTIVITY_TYPE } from 'src/activity/constants/enum-values';
import { ActivityService } from 'src/activity/activity.service';
import { User } from 'src/user/entities/user.entity';
import { Report } from './entities/report.entity';
import { REPORT_SUCCESS_MESSAGES, TYPE_REPORT } from './constants';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let reportRepository: jest.Mocked<Repository<Report>>;
  let activityService: jest.Mocked<ActivityService>;

  const user = {
    id: 'user-1',
    name: 'Ana',
  } as User;

  beforeEach(() => {
    reportRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    } as any;

    activityService = {
      create: jest.fn(),
    } as any;

    service = new ReportsService(reportRepository, activityService);
  });

  it('creates monthly report and monthly activity', async () => {
    const dto = { name: 'R1', type: TYPE_REPORT.MONTHLY_REPORT } as any;
    reportRepository.create.mockReturnValue(dto);
    reportRepository.save.mockResolvedValue(dto);
    activityService.create.mockResolvedValue({} as any);

    await expect(service.create(dto, user)).resolves.toBe(
      REPORT_SUCCESS_MESSAGES.REPORT_CREATED,
    );

    expect(activityService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTIVITY_TYPE.MONTHLY_REPORT,
        userId: 'user-1',
      }),
    );
  });

  it('creates analysis report and analysis activity', async () => {
    const dto = { name: 'R2', type: TYPE_REPORT.ANALYSIS_REPORT } as any;
    reportRepository.create.mockReturnValue(dto);
    reportRepository.save.mockResolvedValue(dto);
    activityService.create.mockResolvedValue({} as any);

    await service.create(dto, user);

    expect(activityService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTIVITY_TYPE.ANALYSIS_REPORT,
      }),
    );
  });

  it('creates user report and user activity', async () => {
    const dto = { name: 'R3', type: TYPE_REPORT.USER_REPORT } as any;
    reportRepository.create.mockReturnValue(dto);
    reportRepository.save.mockResolvedValue(dto);
    activityService.create.mockResolvedValue({} as any);

    await service.create(dto, user);

    expect(activityService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTIVITY_TYPE.USER_REPORT,
      }),
    );
  });

  it('findAll returns repository data', async () => {
    const reports = [{ id: 'report-1' }] as any;
    reportRepository.find.mockResolvedValue(reports);

    await expect(service.findAll()).resolves.toBe(reports);
  });
});
