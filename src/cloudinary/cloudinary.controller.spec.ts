import { CloudinaryController } from './cloudinary.controller';

describe('CloudinaryController', () => {
  it('delegates uploadImages to service', () => {
    const cloudinaryService = {
      uploadFiles: jest.fn(),
    };
    const controller = new CloudinaryController(cloudinaryService as any);

    const files = [{ buffer: Buffer.from('a') }] as any;
    controller.uploadImages(files);

    expect(cloudinaryService.uploadFiles).toHaveBeenCalledWith(files);
  });
});
