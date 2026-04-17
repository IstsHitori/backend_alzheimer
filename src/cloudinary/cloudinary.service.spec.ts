import { CloudinaryService } from './cloudinary.service';

describe('CloudinaryService', () => {
  it('uploads files successfully', async () => {
    const uploadStream = jest.fn((_: any, cb: any) => {
      return {
        end: () => cb(null, { secure_url: 'https://cdn/image.png' }),
      };
    });

    const cloudinary = {
      uploader: {
        upload_stream: uploadStream,
      },
    } as any;

    const service = new CloudinaryService(cloudinary);

    const files = [{ buffer: Buffer.from('abc') }] as any;
    await expect(service.uploadFiles(files)).resolves.toEqual([
      { secure_url: 'https://cdn/image.png' },
    ]);
  });

  it('rejects when cloudinary upload fails', async () => {
    const uploadStream = jest.fn((_: any, cb: any) => {
      return {
        end: () => cb(new Error('upload error')),
      };
    });

    const cloudinary = {
      uploader: {
        upload_stream: uploadStream,
      },
    } as any;

    const service = new CloudinaryService(cloudinary);

    await expect(service.uploadFiles([{ buffer: Buffer.from('abc') }] as any)).rejects.toThrow(
      'upload error',
    );
  });
});
