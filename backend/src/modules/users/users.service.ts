import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { UserRegisterDto } from '../../auth/dtos/user-register.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  async create(userRegisterDto: UserRegisterDto) {
    return await this.usersRepository.create(userRegisterDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async active(id: string) {
    return await this.usersRepository.update(id, {
      deleted_at: null,
    } as UpdateUserDto);
  }

  async softRemove(id: string) {
    return await this.usersRepository.update(id, {
      deleted_at: new Date(),
    } as UpdateUserDto);
  }
}
