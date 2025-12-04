import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { FileValidatorService } from './helpers';
import { AdminSeeder, Cie10Seeder, CumSeeder } from './seeders';

@Injectable()
export class SeedService {
  private readonly FILE_CI10_PATH = path.join(
    __dirname,
    'files',
    'CIE-10.xlsx',
  );
  private readonly FILE_CUM_PATH = path.join(
    __dirname,
    'files',
    'CUM-2025.xlsx',
  );

  constructor(
    private readonly fileValidator: FileValidatorService,
    private readonly adminSeeder: AdminSeeder,
    private readonly cie10Seeder: Cie10Seeder,
    private readonly cumSeeder: CumSeeder,
  ) {}

  async execute() {
    await this.fileValidator.check([this.FILE_CI10_PATH, this.FILE_CUM_PATH]);

    await this.adminSeeder.run();

    await this.cie10Seeder.run(this.FILE_CI10_PATH);

    await this.cumSeeder.run(this.FILE_CUM_PATH);
  }
}
