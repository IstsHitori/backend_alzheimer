import { ExcelParserService } from '../helpers/excel-parser.service';
import { Cie10Seeder } from './cie10.seeder';

describe('Cie10Seeder', () => {
  let seeder: Cie10Seeder;
  let dataSource: { manager: { count: jest.Mock }; transaction: jest.Mock };
  let excelParser: jest.Mocked<ExcelParserService>;

  beforeEach(() => {
    dataSource = {
      manager: { count: jest.fn() },
      transaction: jest.fn(),
    };
    excelParser = { readData: jest.fn() } as any;

    seeder = new Cie10Seeder(dataSource as any, excelParser);
  });

  it('returns early if there is existing data', async () => {
    dataSource.manager.count.mockResolvedValue(1 as any);

    await seeder.run('cie10.xlsx');

    expect(excelParser.readData).not.toHaveBeenCalled();
  });

  it('returns early if parsed data is empty', async () => {
    dataSource.manager.count.mockResolvedValue(0 as any);
    excelParser.readData.mockReturnValue([] as any);

    await seeder.run('cie10.xlsx');

    expect(dataSource.transaction).not.toHaveBeenCalled();
  });

  it('creates and saves conditions', async () => {
    dataSource.manager.count.mockResolvedValue(0 as any);
    excelParser.readData.mockReturnValue([{ code: 'A00', name: 'x' }] as any);

    const manager = {
      create: jest.fn((_: any, obj: any) => obj),
      save: jest.fn(),
    };

    dataSource.transaction.mockImplementation(async cb => cb(manager as any));

    await seeder.run('cie10.xlsx');

    expect(manager.create).toHaveBeenCalled();
    expect(manager.save).toHaveBeenCalled();
  });
});
