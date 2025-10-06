import { Injectable } from '@nestjs/common';
//import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { ResponseUserDto } from '../modules/users/dtos/response-user.dto';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  /* async login(userLoginDto: UserLoginDto) {}*/
  async register(userRegisterDto: UserRegisterDto): Promise<ResponseUserDto> {
    return await this.usersService.create(userRegisterDto);
  }
}
