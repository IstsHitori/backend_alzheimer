import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signin(@Body() loginUserDto: LoginUserDto) {
    this.logger.log('Loging user in controller', AuthController.name);
    const message = await this.authService.signin(loginUserDto);
    this.logger.log('Finalized user in controller');
    return message;
  }
}
