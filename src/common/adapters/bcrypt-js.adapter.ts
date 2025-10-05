import { Injectable } from '@nestjs/common';
import { HashAdapter } from '../interfaces/hash.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptjsAdapter implements HashAdapter {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
