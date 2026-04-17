jest.mock('@e965/xlsx', () => ({
  readFile: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));

import * as XLSX from '@e965/xlsx';
import { ExcelParserService } from './excel-parser.service';

describe('ExcelParserService', () => {
  it('reads first worksheet and converts to json', () => {
    (XLSX.readFile as jest.Mock).mockReturnValue({
      SheetNames: ['Sheet1'],
      Sheets: { Sheet1: { A1: { v: 'data' } } },
    });
    (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue([{ a: 1 }]);

    const service = new ExcelParserService();
    const result = service.readData<{ a: number }>('file.xlsx');

    expect(XLSX.readFile).toHaveBeenCalledWith('file.xlsx');
    expect(XLSX.utils.sheet_to_json).toHaveBeenCalled();
    expect(result).toEqual([{ a: 1 }]);
  });
});
