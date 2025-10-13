import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { ResponseUserDto } from '../modules/users/dtos/response-user.dto';
import { HashUserPasswordPipe } from '../common/pipes/hash-user-password.pipe';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  CreatedResponseDecorator,
  OkResponseDecorator,
  ValidationBadRequestResponseDecorator,
  UsuarioUnauthorizedResponseDecorator,
  ConflictResponseDecorator,
  userResponseExample,
} from '../common/decorators/swagger-api.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  @OkResponseDecorator('Perfil do usuário retornado com sucesso', {
    user_id: 'user-123',
    username: 'joao',
  })
  @UsuarioUnauthorizedResponseDecorator()
  profile(@GetUser() user: Record<string, any>) {
    return user;
  }

  @Post('login')
  @OkResponseDecorator('Login realizado com sucesso', {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    payload: {
      sub: 'user-123',
      username: 'joao',
    },
  })
  @ValidationBadRequestResponseDecorator()
  @UsuarioUnauthorizedResponseDecorator()
  async login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<Record<any, string>> {
    return await this.authService.login(userLoginDto);
  }

  @Post('register')
  @CreatedResponseDecorator('Usuário registrado com sucesso', {
    ...userResponseExample,
    password: undefined,
  })
  @ValidationBadRequestResponseDecorator()
  @ConflictResponseDecorator('Username já existe')
  async register(
    @Body(HashUserPasswordPipe) userRegisterDto: UserRegisterDto,
  ): Promise<ResponseUserDto> {
    return await this.authService.register(userRegisterDto);
  }
}
