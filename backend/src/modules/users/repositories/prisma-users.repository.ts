import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersRepository } from './abstract-users.repository';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(userRegisterDto: UserRegisterDto): Promise<ResponseUserDto> {
    return await this.prismaClient.users.create({
      data: userRegisterDto,
      omit: { password: true, deleted_at: true },
    });
  }
  async findAll(): Promise<ResponseUserDto[]> {
    return await this.prismaClient.users.findMany({
      where: { deleted_at: null },
      omit: { password: true, deleted_at: true },
      include: { collaborator: true },
    });
  }
  async findOne(id: string): Promise<ResponseUserDto> {
    return await this.prismaClient.users.findUniqueOrThrow({
      where: { id, deleted_at: null },
      omit: { password: true, deleted_at: true },
      include: { collaborator: true },
    });
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return await this.prismaClient.users.update({
      where: { id },
      omit: { password: true },
      include: { collaborator: true },
      data: updateUserDto,
    });
  }
}
