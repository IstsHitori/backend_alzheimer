import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_ERROR_MESSAGES } from 'src/auth/constants';
import { META_ROLES } from 'src/auth/constants/meta-roles';
import { UserRoleGuard } from './user-role.guard';

describe('UserRoleGuard', () => {
  let guard: UserRoleGuard;
  let reflector: jest.Mocked<Reflector>;

  const makeContext = (user: any) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getHandler: () => ({}),
    }) as any;

  beforeEach(() => {
    reflector = {
      get: jest.fn(),
    } as any;
    guard = new UserRoleGuard(reflector);
  });

  it('throws when request has no user', () => {
    expect(() => guard.canActivate(makeContext(undefined))).toThrow(
      new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_FOUND_GUARD),
    );
  });

  it('allows access when no roles metadata is present', () => {
    reflector.get.mockReturnValue(undefined as any);

    expect(guard.canActivate(makeContext({ role: 'doctor' }))).toBe(true);
    expect(reflector.get).toHaveBeenCalledWith(META_ROLES, expect.any(Object));
  });

  it('allows access when roles metadata is empty', () => {
    reflector.get.mockReturnValue([]);

    expect(guard.canActivate(makeContext({ role: 'doctor' }))).toBe(true);
  });

  it('throws forbidden when role is not valid', () => {
    reflector.get.mockReturnValue(['admin']);

    expect(() => guard.canActivate(makeContext({ role: 'doctor' }))).toThrow(
      new ForbiddenException(AUTH_ERROR_MESSAGES.VALID_ROLE),
    );
  });

  it('allows access when role is included', () => {
    reflector.get.mockReturnValue(['admin', 'doctor']);

    expect(guard.canActivate(makeContext({ role: 'doctor' }))).toBe(true);
  });
});
