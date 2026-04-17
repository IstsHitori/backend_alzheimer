jest.mock('@nestjs/common', () => {
  const actual = jest.requireActual('@nestjs/common');
  return {
    ...actual,
    createParamDecorator: jest.fn(factory => factory),
  };
});

import { InternalServerErrorException } from '@nestjs/common';
import { AUTH_ERROR_MESSAGES } from '../constants';
import { GetUser } from './get-user-decorator';

describe('GetUser decorator factory', () => {
  const makeCtx = (user?: any) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    }) as any;

  it('returns full user when no data param is provided', () => {
    const user = { id: 'u1', email: 'a@mail.com' };

    const result = (GetUser as any)(undefined, makeCtx(user));

    expect(result).toBe(user);
  });

  it('returns only email payload when data param is present', () => {
    const user = { id: 'u1', email: 'a@mail.com' };

    const result = (GetUser as any)('email', makeCtx(user));

    expect(result).toEqual({ email: 'a@mail.com' });
  });

  it('throws internal error when request user does not exist', () => {
    expect(() => (GetUser as any)(undefined, makeCtx(undefined))).toThrow(
      new InternalServerErrorException(
        AUTH_ERROR_MESSAGES.USER_NOT_FOUND_GUARD,
      ),
    );
  });
});
