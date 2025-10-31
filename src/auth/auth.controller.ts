import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user-decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signin(@Body() loginUserDto: LoginUserDto) {
    this.logger.log('Loging user in controller', AuthController.name);
    const message = await this.authService.signin(loginUserDto);
    this.logger.log('Finalized login user in controller');
    return message;
  }

  @Auth()
  @Get('profile')
  getUserProfile(@GetUser() user: User) {
    return this.authService.getUserProfile(user);
  }
}
