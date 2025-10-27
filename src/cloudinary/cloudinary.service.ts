/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof Cloudinary,
  ) {}
  async uploadFiles(files: Express.Multer.File[]) {
    const results = await Promise.all(
      files.map(
        file =>
          new Promise((resolve, reject) => {
            const stream = this.cloudinary.uploader.upload_stream(
              { folder: 'alzheimer' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              },
            );
            stream.end(file.buffer);
          }),
      ),
    );
    return results;
  }
}
