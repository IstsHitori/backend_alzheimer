import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController integration', () => {
  let controller: AuthController;
  let authService: {
    signin: jest.Mock;
    getUserProfile: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      signin: jest.fn(),
      getUserProfile: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = moduleRef.get(AuthController);
  });

  it('delegates login to AuthService', async () => {
    const loginUserDto = {
      userName: 'doctor1',
      password: 'Secret123!',
    };

    authService.signin.mockResolvedValue({ token: 'jwt-token' });

    await expect(controller.signin(loginUserDto as any)).resolves.toEqual({
      token: 'jwt-token',
    });
    expect(authService.signin).toHaveBeenCalledWith(loginUserDto);
  });

  it('returns the profile returned by AuthService', () => {
    const user = {
      id: 'user-1',
      name: 'Ana Perez',
      userName: 'anap',
      role: 'doctor',
    };

    authService.getUserProfile.mockReturnValue(user);

    expect(controller.getUserProfile(user as any)).toEqual(user);
    expect(authService.getUserProfile).toHaveBeenCalledWith(user);
  });
});