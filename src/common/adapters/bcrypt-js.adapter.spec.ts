jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import * as bcrypt from 'bcryptjs';
import { BcryptjsAdapter } from './bcrypt-js.adapter';

describe('BcryptjsAdapter', () => {
  let adapter: BcryptjsAdapter;

  beforeEach(() => {
    adapter = new BcryptjsAdapter();
  });

  it('hash delegates to bcrypt.hash', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

    await expect(adapter.hash('secret')).resolves.toBe('hashed');
    expect(bcrypt.hash).toHaveBeenCalledWith('secret', 10);
  });

  it('compare delegates to bcrypt.compare', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await expect(adapter.compare('secret', 'hashed')).resolves.toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith('secret', 'hashed');
  });
});
