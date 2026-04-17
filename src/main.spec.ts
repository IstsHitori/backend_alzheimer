describe('main bootstrap', () => {
  it('bootstraps and configures the app', async () => {
    const enableCors = jest.fn();
    const setGlobalPrefix = jest.fn();
    const useGlobalPipes = jest.fn();
    const listen = jest.fn().mockResolvedValue(undefined);

    const configService = {
      get: jest.fn((key: string) => {
        if (key === 'API_FRONTEND') return 'http://frontend';
        if (key === 'API_BACKEND_IA') return 'http://backend-ia';
        return undefined;
      }),
    };

    const seedService = {
      execute: jest.fn().mockResolvedValue(undefined),
    };

    const app = {
      get: jest.fn((token: unknown) => {
        const tokenName = (token as { name?: string } | undefined)?.name;
        if (tokenName === 'ConfigService') return configService;
        if (tokenName === 'SeedService') return seedService;
        return undefined;
      }),
      enableCors,
      setGlobalPrefix,
      useGlobalPipes,
      listen,
    };

    const create = jest.fn().mockResolvedValue(app);

    jest.resetModules();
    jest.doMock('@nestjs/core', () => ({
      NestFactory: { create },
    }));

    await import('./main');
    await new Promise(resolve => setImmediate(resolve));

    expect(create).toHaveBeenCalled();
    expect(seedService.execute).toHaveBeenCalled();
    expect(enableCors).toHaveBeenCalledWith({
      origin: ['http://frontend', 'http://backend-ia'],
    });
    expect(setGlobalPrefix).toHaveBeenCalledWith('api/v1');
    expect(useGlobalPipes).toHaveBeenCalled();
    expect(listen).toHaveBeenCalled();
  });
});
