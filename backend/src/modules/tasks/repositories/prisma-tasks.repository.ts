import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TasksRepository } from './abstract-tasks.repository';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { ResponseTaskDto } from '../dtos/response-task.dto';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  async create(createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
    return await this.prismaClient.tasks.create({
      data: createTaskDto,
      omit: { deleted_at: true },
    });
  }
  async findAll(): Promise<ResponseTaskDto[]> {
    return await this.prismaClient.tasks.findMany({
      where: { deleted_at: null },
      omit: { deleted_at: true },
    });
  }
  async findOne(id: string): Promise<ResponseTaskDto> {
    return await this.prismaClient.tasks.findUniqueOrThrow({
      where: { id, deleted_at: null },
    });
  }
  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseTaskDto> {
    return await this.prismaClient.tasks.update({
      where: { id },
      data: updateTaskDto,
    });
  }
}
