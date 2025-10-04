import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { PrismaTasksRepository } from './repositories/prisma-tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: PrismaTasksRepository) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.create(createTaskDto);
  }

  async findAll() {
    return await this.tasksRepository.findAll();
  }

  async findOne(id: string) {
    return await this.tasksRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.update(id, updateTaskDto);
  }

  async active(id: string) {
    return await this.tasksRepository.update(id, {
      deleted_at: null,
    } as UpdateTaskDto);
  }

  async softRemove(id: string) {
    return await this.tasksRepository.update(id, {
      deleted_at: new Date(),
    } as UpdateTaskDto);
  }
}
