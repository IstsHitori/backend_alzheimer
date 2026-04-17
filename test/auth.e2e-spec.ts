import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';

describe('AuthController e2e', () => {
  let app: INestApplication;
  const authService = {
    signin: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns a JWT token on successful login', () => {
    authService.signin.mockResolvedValue({ token: 'jwt-token' });

    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        userName: 'doctor1',
        password: 'Secret123!',
      })
      .expect(200)
      .expect({ token: 'jwt-token' });
  });

  it('rejects payloads with non-whitelisted properties', () => {
    authService.signin.mockResolvedValue({ token: 'jwt-token' });

    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        userName: 'doctor1',
        password: 'Secret123!',
        unexpected: true,
      })
      .expect(400);
  });
});
