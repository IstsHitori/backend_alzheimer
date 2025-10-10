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
    this.logger.log('Finalized login user in controller');
    return message;
  }

  // @Get('private')
  // //Esta guard llamado AuthGuard implementa
  // //todas las configuraciones que hicimos en la strategia
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @GetUser() userInfo: User,
  //   @GetUser('email') email: string,
  //   @Headers() headers: IncomingHttpHeaders,
  // ) {
  //   console.log({ headers });

  //   return ' Hola mundo private';
  // }

  // @Get('private2')
  // // @SetMetadata('roles', ['medico'])
  // @RoleProtected(ROLE.ADMIN)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privtateRoute2(@GetUser() user: User) {
  //   return user;
  // }

  // @Get('private3')
  // @Auth(ROLE.DOCTOR)
  // privtateRoute3(@GetUser() user: User) {
  //   return user;
  // }
}
