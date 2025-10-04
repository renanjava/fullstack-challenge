import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './abstract-projects.repository';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { ResponseProjectsDto } from '../dtos/response-projects.dto';

@Injectable()
export class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<ResponseProjectsDto> {
    return await this.prismaClient.projects.create({
      data: createProjectDto,
      include: { tasks: true },
    });
  }
  async findAll(): Promise<ResponseProjectsDto[]> {
    return await this.prismaClient.projects.findMany({
      where: { deleted_at: null },
      omit: { deleted_at: true },
      include: { tasks: true },
    });
  }
  async findOne(id: string): Promise<ResponseProjectsDto> {
    return await this.prismaClient.projects.findUniqueOrThrow({
      where: { id, deleted_at: null },
      include: { tasks: true },
    });
  }
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseProjectsDto> {
    return await this.prismaClient.projects.update({
      where: { id },
      include: { tasks: true },
      data: updateProjectDto,
    });
  }
}
