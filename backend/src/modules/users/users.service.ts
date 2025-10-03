import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}
  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async softRemove(id: string) {
    return await this.usersRepository.softRemove(id);
  }
}
