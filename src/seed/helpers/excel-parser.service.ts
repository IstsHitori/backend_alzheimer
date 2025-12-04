import * as XLSX from '@e965/xlsx';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcelParserService {
  readData<T>(filePath: string): T[] {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(workSheet) satisfies T[];
  }
}
