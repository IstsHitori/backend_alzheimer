import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signin(@Body() loginUserDto: LoginUserDto) {
    this.logger.log('Loging user in controller', AuthController.name);
    const user = this.authService.signin(loginUserDto);
    this.logger.log('Finalized user in controller');
    return user;
  }
}
