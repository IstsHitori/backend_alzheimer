import { PatientPersistenceService } from './patient-persistence.service';

describe('PatientPersistenceService', () => {
  let service: PatientPersistenceService;
  let dataSource: { transaction: jest.Mock };
  let validator: {
    validatePatientExistence: jest.Mock;
    findEpsById: jest.Mock;
    getValidCondition: jest.Mock;
    getValidMedication: jest.Mock;
    validateIdentificationForUpdate: jest.Mock;
  };

  const makeManager = () => ({
    create: jest.fn((_: any, obj: any) => ({ ...obj })),
    save: jest.fn(async (_: any, obj: any) => obj),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
  });

  beforeEach(() => {
    dataSource = { transaction: jest.fn() };
    validator = {
      validatePatientExistence: jest.fn(),
      findEpsById: jest.fn(),
      getValidCondition: jest.fn(),
      getValidMedication: jest.fn(),
      validateIdentificationForUpdate: jest.fn(),
    };

    service = new PatientPersistenceService(dataSource as any, validator as any);
  });

  it('createPatientTransaction creates and saves all related entities', async () => {
    const manager = makeManager();
    dataSource.transaction.mockImplementation(async cb => cb(manager as any));

    validator.findEpsById.mockResolvedValue({ id: 1 });
    validator.getValidCondition.mockResolvedValue({ id: 10 });
    validator.getValidMedication.mockResolvedValue({ id: 20 });

    manager.save.mockImplementation(async (entity: any, obj: any) => {
      if (entity?.name === 'Patient') return { ...obj, id: 'p1', fullName: 'Ana' };
      return obj;
    });

    const dto = {
      identification: '123',
      fullName: 'Ana',
      eps: 1,
      conditions: [{ code: 'A00' }],
      currentMedications: [{ expedient: 'X1' }],
      familyBackground: [{ code: 'A00' }],
      symptomsPresent: { memoryLoss: true },
    } as any;

    const result = await service.createPatientTransaction(dto);

    expect(validator.validatePatientExistence).toHaveBeenCalledWith('123', manager);
    expect(result).toEqual(expect.objectContaining({ id: 'p1' }));
    expect(manager.save).toHaveBeenCalled();
  });

  it('updatePatientTransaction updates all sections when provided', async () => {
    const manager = makeManager();
    dataSource.transaction.mockImplementation(async cb => cb(manager as any));
    validator.findEpsById.mockResolvedValue({ id: 99 });
    validator.getValidCondition.mockResolvedValue({ id: 10 });
    validator.getValidMedication.mockResolvedValue({ id: 20 });
    manager.findOne.mockResolvedValue({ id: 5, memoryLoss: false });

    await service.updatePatientTransaction('p1', {
      basicData: { identification: '123', fullName: 'Ana2' } as any,
      eps: 99,
      conditions: [{ code: 'A00' }] as any,
      currentMedications: [{ expedient: 'X1' }] as any,
      familyBackground: [{ code: 'A00' }] as any,
      symptomsPresent: { memoryLoss: true } as any,
    });

    expect(validator.validateIdentificationForUpdate).toHaveBeenCalled();
    expect(manager.update).toHaveBeenCalled();
    expect(manager.delete).toHaveBeenCalled();
    expect(manager.save).toHaveBeenCalled();
  });

  it('updatePatientTransaction does not fail when optional arrays are empty', async () => {
    const manager = makeManager();
    dataSource.transaction.mockImplementation(async cb => cb(manager as any));

    await expect(
      service.updatePatientTransaction('p1', {
        basicData: { fullName: 'Ana2' } as any,
        conditions: [],
        currentMedications: [],
        familyBackground: [],
      }),
    ).resolves.toBeUndefined();

    expect(manager.update).toHaveBeenCalledTimes(1);
  });
});
