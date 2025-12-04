import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class FileValidatorService {
  private readonly logger = new Logger(FileValidatorService.name);
  constructor() {}
  async check(filesToCheck: string[]): Promise<boolean> {
    for (const filePath of filesToCheck) {
      try {
        await fs.access(filePath);
      } catch (error) {
        const err = error as NodeJS.ErrnoException;
        if (err.code === 'ENOENT') {
          this.logger.error(
            `❌ FILE MISSING: ${path.basename(filePath)} - SEARCHED IN: ${filePath}`,
          );
          throw new Error(
            'Cannot start seeding. Essential data files are missing.',
          );
        }
        throw error;
      }
    }
    return true;
  }
}
