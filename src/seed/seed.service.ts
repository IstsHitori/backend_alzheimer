import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as XLSX from '@e965/xlsx';
import { User } from 'src/user/entities/user.entity';
import { ROLE } from 'src/user/constants';
import { ConfigService } from '@nestjs/config';
import { HashAdapter } from 'src/common/interfaces/hash.interface';
import { CIE10, CUM } from './interfaces';
import { Condition, CurrentMedications } from 'src/patient/entities';
import { SEED_MESSAGES } from './messages';

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

  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly config: ConfigService,
    @Inject('HashAdapter')
    private readonly hasher: HashAdapter,
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
    @InjectRepository(CurrentMedications)
    private readonly currentMedicRepository: Repository<CurrentMedications>,
  ) {}

  async execute() {
    await this.seedAdmin();

    await this.checkIfFilesExist();

    await this.seedCIE10FromExcel();

    await this.seedCUMFromExcel();
  }

  private async seedAdmin() {
    await this.dataSource.transaction(async manager => {
      const existAdmin = await this.isAdminExist(manager);

      if (existAdmin) return;

      this.logger.log(SEED_MESSAGES.CREATING_ADMIN);

      await this.createAdminAndSave(manager);

      this.logger.log(SEED_MESSAGES.ADMIN_CREATED);
    });
  }

  private async seedCIE10FromExcel() {
    const hasConditions = await this.checkIfConditionExist();
    if (hasConditions) return;

    const data = this.readDataFromExcel<CIE10>(this.FILE_CI10_PATH);
    if (data.length < 1) return;

    this.logger.log(SEED_MESSAGES.CREATING_CIE10);

    await this.dataSource.transaction(async manager => {
      const conditionEntities = data.map(condition =>
        manager.create(Condition, condition),
      );

      await manager.save(Condition, conditionEntities);

      this.logger.log(SEED_MESSAGES.CIE10_CREATED);
    });
  }

  private async seedCUMFromExcel() {
    const hasMedications = await this.checkIfMedicationExist();
    if (hasMedications) return;

    const data = this.readDataFromExcel<CUM>(this.FILE_CUM_PATH);
    if (data.length < 1) return;

    const BATCH_SIZE = 1000;

    this.logger.log(SEED_MESSAGES.CREATING_CUM);

    for (let i = 0; i <= data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);

      await this.dataSource.transaction(async manager => {
        const medicationEntities = batch.map(
          ({ medicalSample, referenceUnit, expedient, ...rest }) =>
            manager.create(CurrentMedications, {
              medicalSample: medicalSample.toLowerCase() === 'si',
              expedient: expedient.toString(),
              referenceUnit:
                referenceUnit === undefined ? 'N/A' : referenceUnit,
              ...rest,
            }),
        );

        await manager.save(CurrentMedications, medicationEntities);
      });
    }

    this.logger.log(SEED_MESSAGES.CUM_CREATED);
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

  private readDataFromExcel<T>(path: string): T[] {
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetName[0]];
    const data: T[] = XLSX.utils.sheet_to_json(worksheet);
    return data;
  }

  private async checkIfConditionExist() {
    const conditions = await this.conditionRepository.find({
      select: ['id'],
      take: 1,
    });
    return conditions.length > 0;
  }

  private async checkIfMedicationExist() {
    const medications = await this.currentMedicRepository.find({
      select: ['id'],
      take: 1,
    });

    return medications.length > 0;
  }

  private async checkIfFilesExist() {
    const filesToCheck = [this.FILE_CI10_PATH, this.FILE_CUM_PATH];

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
            'No se puede iniciar el seeding. Faltan archivos de datos esenciales.',
          );
        }
        throw error;
      }
    }
    return true;
  }
}
