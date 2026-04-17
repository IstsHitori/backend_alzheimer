import { Repository } from 'typeorm';
import { Condition, CurrentMedications, Eps } from 'src/patient/entities';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let epsRepository: jest.Mocked<Repository<Eps>>;
  let currentMedicationRepository: jest.Mocked<Repository<CurrentMedications>>;
  let conditionRepository: jest.Mocked<Repository<Condition>>;

  beforeEach(() => {
    epsRepository = { find: jest.fn() } as any;
    currentMedicationRepository = { find: jest.fn() } as any;
    conditionRepository = { find: jest.fn() } as any;

    service = new CatalogService(
      epsRepository,
      currentMedicationRepository,
      conditionRepository,
    );
  });

  it('findAllEps returns all eps', async () => {
    epsRepository.find.mockResolvedValue([{ id: 1 }] as any);

    await expect(service.findAllEps()).resolves.toEqual([{ id: 1 }]);
    expect(epsRepository.find).toHaveBeenCalled();
  });

  it('findAllCum uses pagination', async () => {
    currentMedicationRepository.find.mockResolvedValue([] as any);

    await service.findAllCum(15, 5);

    expect(currentMedicationRepository.find).toHaveBeenCalledWith({
      take: 15,
      skip: 5,
    });
  });

  it('findCumBySearch builds ordered query with limit', async () => {
    currentMedicationRepository.find.mockResolvedValue([] as any);

    await service.findCumBySearch('Acetaminofen', 7);

    expect(currentMedicationRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        order: { product: 'ASC' },
        take: 7,
      }),
    );
  });

  it('findAllCIE10 uses pagination', async () => {
    conditionRepository.find.mockResolvedValue([] as any);

    await service.findAllCIE10(8, 2);

    expect(conditionRepository.find).toHaveBeenCalledWith({
      take: 8,
      skip: 2,
    });
  });

  it('findCIE10BySearch builds ordered query with limit', async () => {
    conditionRepository.find.mockResolvedValue([] as any);

    await service.findCIE10BySearch('G30', 5);

    expect(conditionRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        order: { name: 'ASC' },
        take: 5,
      }),
    );
  });
});
