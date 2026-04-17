import { ConfigService } from '@nestjs/config';
import { ROLE } from 'src/user/constants';
import { AdminSeeder } from './admin.seeder';

describe('AdminSeeder', () => {
  let seeder: AdminSeeder;
  let config: jest.Mocked<ConfigService>;
  let hasher: { hash: jest.Mock };
  let dataSource: { transaction: jest.Mock };

  beforeEach(() => {
    config = { get: jest.fn() } as any;
    hasher = { hash: jest.fn() };
    dataSource = { transaction: jest.fn() };

    seeder = new AdminSeeder(config, hasher as any, dataSource as any);
  });

  it('returns early when admin already exists', async () => {
    const manager = { findOne: jest.fn().mockResolvedValue({ id: 'a1' }) };
    dataSource.transaction.mockImplementation(async cb => cb(manager as any));

    await seeder.run();

    expect(manager.findOne).toHaveBeenCalled();
  });

  it('creates admin when it does not exist', async () => {
    const manager = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn((_: any, obj: any) => obj),
      save: jest.fn().mockResolvedValue(undefined),
    };

    config.get.mockImplementation((key: string) => {
      const m: Record<string, string> = {
        ADMIN_NAME: 'Admin',
        ADMIN_USERNAME: 'admin',
        ADMIN_PASSWORD: 'Secret123!',
        ADMIN_EMAIL: 'admin@mail.com',
      };
      return m[key];
    });
    hasher.hash.mockResolvedValue('hashed');

    dataSource.transaction.mockImplementation(async cb => cb(manager as any));

    await seeder.run();

    expect(manager.create).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ role: ROLE.ADMIN, password: 'hashed' }),
    );
    expect(manager.save).toHaveBeenCalled();
  });
});
