import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Condition } from 'src/patient/entities';
import { DataSource } from 'typeorm';
import { ExcelParserService } from '../helpers/excel-parser.service';
import { SEED_MESSAGES } from '../messages';
import { CIE10 } from '../interfaces';

@Injectable()
export class Cie10Seeder {
  private readonly logger = new Logger(Cie10Seeder.name);
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly excelParser: ExcelParserService,
  ) {}

  async run(filePath: string) {
    if (await this.hasData()) return;

    const data = this.excelParser.readData<CIE10>(filePath);

    if (data.length === 0) return;

    this.logger.debug(SEED_MESSAGES.CREATING_CIE10);

    await this.createAndSaveConditions(data);
  }

  private async hasData(): Promise<boolean> {
    const count = await this.dataSource.manager.count(Condition, { take: 1 });
    return count > 0;
  }

  private async createAndSaveConditions(data: CIE10[]) {
    await this.dataSource.transaction(async manager => {
      const conditionEntities = data.map(condition =>
        manager.create(Condition, condition),
      );

      await manager.save(Condition, conditionEntities);

      this.logger.debug(SEED_MESSAGES.CIE10_CREATED);
    });
  }
}
