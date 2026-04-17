jest.mock('fs/promises', () => ({
  access: jest.fn(),
}));

import * as fs from 'fs/promises';
import { FileValidatorService } from './file-validator.service';

describe('FileValidatorService', () => {
  let service: FileValidatorService;

  beforeEach(() => {
    service = new FileValidatorService();
  });

  it('returns true when all files exist', async () => {
    (fs.access as jest.Mock).mockResolvedValue(undefined);

    await expect(service.check(['a.xlsx', 'b.xlsx'])).resolves.toBe(true);
  });

  it('throws friendly error when file is missing', async () => {
    (fs.access as jest.Mock).mockRejectedValue({ code: 'ENOENT' });

    await expect(service.check(['missing.xlsx'])).rejects.toThrow(
      'Cannot start seeding. Essential data files are missing.',
    );
  });

  it('rethrows unknown fs errors', async () => {
    const err = new Error('perm');
    (fs.access as jest.Mock).mockRejectedValue(err);

    await expect(service.check(['a.xlsx'])).rejects.toThrow('perm');
  });
});
