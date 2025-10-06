import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { ResponseUserDto } from '../modules/users/dtos/response-user.dto';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptHash } from '../common/utils/bcrypt-hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(userLoginDto: UserLoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsernameAndReturnPassword(
      userLoginDto.username,
    );
    const isValidPassword = await BcryptHash.comparePassword(
      user.password,
      userLoginDto.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Senha inválida');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userRegisterDto: UserRegisterDto): Promise<ResponseUserDto> {
    return await this.usersService.create(userRegisterDto);
  }
}
