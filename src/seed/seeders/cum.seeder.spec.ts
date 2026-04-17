import { ExcelParserService } from '../helpers/excel-parser.service';
import { CumSeeder } from './cum.seeder';

describe('CumSeeder', () => {
  let seeder: CumSeeder;
  let dataSource: { manager: { count: jest.Mock }; transaction: jest.Mock };
  let excelParser: jest.Mocked<ExcelParserService>;

  beforeEach(() => {
    dataSource = {
      manager: { count: jest.fn() },
      transaction: jest.fn(),
    };
    excelParser = { readData: jest.fn() } as any;

    seeder = new CumSeeder(dataSource as any, excelParser);
  });

  it('returns early if data already exists', async () => {
    dataSource.manager.count.mockResolvedValue(1 as any);

    await seeder.run('cum.xlsx');

    expect(excelParser.readData).not.toHaveBeenCalled();
  });

  it('returns early when excel data is empty', async () => {
    dataSource.manager.count.mockResolvedValue(0 as any);
    excelParser.readData.mockReturnValue([] as any);

    await seeder.run('cum.xlsx');

    expect(dataSource.transaction).not.toHaveBeenCalled();
  });

  it('creates medications in transaction batches', async () => {
    dataSource.manager.count.mockResolvedValue(0 as any);
    excelParser.readData.mockReturnValue([
      {
        medicalSample: 'Si',
        expedient: 123,
        referenceUnit: null,
        product: 'P',
      },
      {
        medicalSample: 'No',
        expedient: 124,
        referenceUnit: 'RU',
        product: 'Q',
      },
    ] as any);

    const manager = {
      create: jest.fn((_: any, obj: any) => obj),
      save: jest.fn(),
    };
    dataSource.transaction.mockImplementation(async cb => cb(manager as any));

    await seeder.run('cum.xlsx');

    expect(manager.create).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ expedient: '123', medicalSample: true, referenceUnit: 'N/A' }),
    );
    expect(manager.save).toHaveBeenCalled();
  });
});
