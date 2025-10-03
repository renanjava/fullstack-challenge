import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersRepository } from './abstract-users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  async findAll(): Promise<UserResponseDto[]> {
    return await this.prismaClient.users.findMany({});
  }
  async findOne(id: string): Promise<UserResponseDto> {
    return await this.prismaClient.users.findUniqueOrThrow({ where: { id } });
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.prismaClient.users.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async softRemove(id: string): Promise<UserResponseDto> {
    return await this.prismaClient.users.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
