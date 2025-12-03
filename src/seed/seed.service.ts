import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import * as path from 'path';
import * as XLSX from '@e965/xlsx';
import { User } from 'src/user/entities/user.entity';
import { ROLE } from 'src/user/constants';
import { ConfigService } from '@nestjs/config';
import { HashAdapter } from 'src/common/interfaces/hash.interface';
import { BOOTSTRAP_ADMIN_MESSAGES } from './messages';

@Injectable()
export class SeedService {
  private readonly FILE_CI10_PATH = path.join(
    __dirname,
    'files',
    'CIE-10.xlsx',
  );
  private readonly FILE_CUM_PATH = '';
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly config: ConfigService,
    @Inject('HashAdapter')
    private readonly hasher: HashAdapter,
  ) {}

  async execute() {
    await this.seedAdmin();
    this.seedC10FromExcel();
  }

  private async seedAdmin() {
    await this.dataSource.transaction(async manager => {
      const existAdmin = await this.isAdminExist(manager);

      if (existAdmin) return;

      this.logger.log(BOOTSTRAP_ADMIN_MESSAGES.CREATING_ADMIN);

      await this.createAdminAndSave(manager);

      this.logger.log(BOOTSTRAP_ADMIN_MESSAGES.ADMIN_CREATED);
    });
  }

  private seedC10FromExcel() {
    const file = path.join(__dirname, 'files', 'CIE-10.xlsx');
    const workBook = XLSX.readFile(file);
    console.log(workBook);
  }

  private async isAdminExist(manager: EntityManager) {
    const userAdmin = await manager.findOne(User, {
      where: { role: ROLE.ADMIN, isActive: true },
    });
    return !!userAdmin;
  }

  private async createAdminAndSave(manager: EntityManager) {
    const userAdminEntity = manager.create(User, {
      name: this.config.get<string>('ADMIN_NAME'),
      userName: this.config.get<string>('ADMIN_USERNAME'),
      password: await this.hasher.hash(
        this.config.get<string>('ADMIN_PASSWORD')!,
      ),
      email: this.config.get<string>('ADMIN_EMAIL'),
      role: ROLE.ADMIN,
    });

    await manager.save(User, userAdminEntity);
  }
}
