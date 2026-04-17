import { SeedService } from './seed.service';

describe('SeedService', () => {
  it('executes validators and seeders in order', async () => {
    const fileValidator = { check: jest.fn().mockResolvedValue(true) };
    const adminSeeder = { run: jest.fn().mockResolvedValue(undefined) };
    const cie10Seeder = { run: jest.fn().mockResolvedValue(undefined) };
    const cumSeeder = { run: jest.fn().mockResolvedValue(undefined) };
    const epsSeeder = { run: jest.fn().mockResolvedValue(undefined) };

    const service = new SeedService(
      fileValidator as any,
      adminSeeder as any,
      cie10Seeder as any,
      cumSeeder as any,
      epsSeeder as any,
    );

    await service.execute();

    expect(fileValidator.check).toHaveBeenCalledTimes(1);
    expect(adminSeeder.run).toHaveBeenCalledTimes(1);
    expect(cie10Seeder.run).toHaveBeenCalledTimes(1);
    expect(cumSeeder.run).toHaveBeenCalledTimes(1);
    expect(epsSeeder.run).toHaveBeenCalledTimes(1);
  });
});
