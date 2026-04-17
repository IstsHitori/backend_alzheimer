import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryProvider } from './providers/cloudinary.provider';

describe('CloudinaryProvider', () => {
  it('configures cloudinary from ConfigService', () => {
    const configSpy = jest
      .spyOn(cloudinary, 'config')
      .mockImplementation(() => undefined as any);
    const configService = {
      get: jest.fn((key: string) => {
        const values: Record<string, string> = {
          CLOUD_NAME: 'demo-cloud',
          CLOUD_API_KEY: 'key-1',
          CLOUD_API_SECRET: 'secret-1',
        };
        return values[key];
      }),
    } as unknown as ConfigService;

    const instance = CloudinaryProvider.useFactory(configService);

    expect(configSpy).toHaveBeenCalledWith({
      cloud_name: 'demo-cloud',
      api_key: 'key-1',
      api_secret: 'secret-1',
    });
    expect(instance).toBe(cloudinary);

    configSpy.mockRestore();
  });
});
