import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { ResponseUserDto } from '../modules/users/dtos/response-user.dto';
import { HashUserPasswordPipe } from '../common/pipes/hash-user-password.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<Record<any, string>> {
    return await this.authService.login(userLoginDto);
  }

  @Post('register')
  async register(
    @Body(HashUserPasswordPipe) userRegisterDto: UserRegisterDto,
  ): Promise<ResponseUserDto> {
    return await this.authService.register(userRegisterDto);
  }
}
