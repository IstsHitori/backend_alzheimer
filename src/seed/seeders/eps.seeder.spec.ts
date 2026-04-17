import { ExcelParserService } from '../helpers';
import { EpsSeeder } from './eps.seeder';

describe('EpsSeeder', () => {
  let seeder: EpsSeeder;
  let dataSource: { manager: { count: jest.Mock }; transaction: jest.Mock };
  let excelParser: jest.Mocked<ExcelParserService>;

  beforeEach(() => {
    dataSource = {
      manager: { count: jest.fn() },
      transaction: jest.fn(),
    };
    excelParser = { readData: jest.fn() } as any;

    seeder = new EpsSeeder(dataSource as any, excelParser);
  });

  it('returns early if eps data exists', async () => {
    dataSource.manager.count.mockResolvedValue(1 as any);

    await seeder.run('eps.xlsx');

    expect(excelParser.readData).not.toHaveBeenCalled();
  });

  it('returns early when excel file has no rows', async () => {
    dataSource.manager.count.mockResolvedValue(0 as any);
    excelParser.readData.mockReturnValue([] as any);

    await seeder.run('eps.xlsx');

    expect(dataSource.transaction).not.toHaveBeenCalled();
  });

  it('creates and saves eps rows', async () => {
    dataSource.manager.count.mockResolvedValue(0 as any);
    excelParser.readData.mockReturnValue([{ entity: 'EPS1', code: '1', regime: 'C' }] as any);

    const manager = {
      create: jest.fn((_: any, obj: any) => obj),
      save: jest.fn(),
    };

    dataSource.transaction.mockImplementation(async cb => cb(manager as any));

    await seeder.run('eps.xlsx');

    expect(manager.create).toHaveBeenCalled();
    expect(manager.save).toHaveBeenCalled();
  });
});
