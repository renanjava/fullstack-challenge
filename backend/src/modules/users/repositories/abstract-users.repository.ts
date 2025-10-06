import { UpdateUserDto } from '../dtos/update-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UserRegisterDto } from '../../../auth/dtos/user-register.dto';
import { Users } from '@prisma/client';

export abstract class UsersRepository {
  abstract create(userRegisterDto: UserRegisterDto): Promise<ResponseUserDto>;
  abstract findAll(): Promise<ResponseUserDto[]>;
  abstract findOne(id: string): Promise<ResponseUserDto>;
  abstract update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto>;
  abstract findByUsernameAndReturnPassword(username: string): Promise<Users>;
}
