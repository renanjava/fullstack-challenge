import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { PrismaProjectsRepository } from './repositories/prisma-projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: PrismaProjectsRepository) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectsRepository.create(createProjectDto);
  }

  async findAll() {
    return await this.projectsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.projectsRepository.findOne(id);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectsRepository.update(id, updateProjectDto);
  }

  async active(id: string) {
    return await this.projectsRepository.update(id, {
      deleted_at: null,
    } as UpdateProjectDto);
  }

  async softRemove(id: string) {
    return await this.projectsRepository.update(id, {
      deleted_at: new Date(),
    } as UpdateProjectDto);
  }
}
