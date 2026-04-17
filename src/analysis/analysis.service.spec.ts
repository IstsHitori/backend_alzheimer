import { NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ActivityService } from 'src/activity/activity.service';
import { ANALYSIS_SUCCESS_MESSAGES } from './constants';
import { AnalysisService } from './analysis.service';

describe('AnalysisService', () => {
  let service: AnalysisService;
  let analysisRepository: jest.Mocked<Repository<any>>;
  let patientRepository: jest.Mocked<Repository<any>>;
  let dataSource: { transaction: jest.Mock };
  let activityService: jest.Mocked<ActivityService>;

  beforeEach(() => {
    analysisRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    } as any;

    patientRepository = {
      findOneBy: jest.fn(),
    } as any;

    dataSource = {
      transaction: jest.fn(),
    };

    activityService = {
      create: jest.fn(),
    } as any;

    service = new AnalysisService(
      analysisRepository,
      patientRepository,
      dataSource as any,
      activityService,
    );
  });

  it('creates analysis with image analysis and activities', async () => {
    const manager: jest.Mocked<EntityManager> = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    } as any;

    patientRepository.findOneBy.mockResolvedValue({ id: 'p-1', fullName: 'Juan' } as any);

    // first image exists, second does not exist
    manager.findOne
      .mockResolvedValueOnce({ id: 'img-existing', imageUrl: 'url1' } as any)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 99, patient: { id: 'p-1' } } as any);

    manager.create
      .mockReturnValueOnce({ id: 50 } as any)
      .mockReturnValueOnce({ id: 'ia-1', diagnosis: 'A' } as any)
      .mockReturnValueOnce({ imageUrl: 'url2', fileName: 'f2' } as any)
      .mockReturnValueOnce({ id: 'ia-2', diagnosis: 'B' } as any);

    manager.save
      .mockResolvedValueOnce({ id: 50 } as any)
      .mockResolvedValueOnce({ id: 'img-new', imageUrl: 'url2' } as any)
      .mockResolvedValueOnce([] as any);

    activityService.create.mockResolvedValue({} as any);

    dataSource.transaction.mockImplementation(async cb => cb(manager));

    const dto = {
      patientId: 'p-1',
      imageAnalysis: [
        {
          imageUrl: 'url1',
          fileName: 'f1',
          diagnosis: 'A',
          nonDemented: 0.1,
          veryMildDemented: 0.2,
          mildDemented: 0.3,
          moderateDemented: 0.4,
        },
        {
          imageUrl: 'url2',
          fileName: 'f2',
          diagnosis: 'B',
          nonDemented: 0.1,
          veryMildDemented: 0.2,
          mildDemented: 0.3,
          moderateDemented: 0.4,
        },
      ],
    } as any;

    const result = await service.create(dto, 'u-1');

    expect(result).toEqual({ id: 99, patient: { id: 'p-1' } });
    expect(activityService.create).toHaveBeenCalledTimes(2);
    expect(analysisRepository.find).not.toHaveBeenCalled();
  });

  it('findAll returns ordered analysis list', async () => {
    analysisRepository.find.mockResolvedValue([{ id: 1 }] as any);

    await expect(service.findAll()).resolves.toEqual([{ id: 1 }]);
    expect(analysisRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({ order: { createdAt: 'DESC' } }),
    );
  });

  it('findAnalysiesByPatient throws if patient does not exist', async () => {
    patientRepository.findOneBy.mockResolvedValue(null);

    await expect(service.findAnalysiesByPatient('p-404')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('findAnalysiesByPatient returns patient analysis list', async () => {
    patientRepository.findOneBy.mockResolvedValue({ id: 'p-1' } as any);
    analysisRepository.find.mockResolvedValue([{ id: 1 }] as any);

    await expect(service.findAnalysiesByPatient('p-1')).resolves.toEqual([{ id: 1 }]);
  });

  it('findOne throws when analysis does not exist', async () => {
    analysisRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(123)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove deletes analysis and returns success message', async () => {
    analysisRepository.findOne.mockResolvedValue({ id: 10 } as any);
    analysisRepository.remove.mockResolvedValue({ id: 10 } as any);

    await expect(service.remove(10)).resolves.toBe(
      ANALYSIS_SUCCESS_MESSAGES.ANALYSIS_DELETED,
    );
    expect(analysisRepository.remove).toHaveBeenCalled();
  });
});
