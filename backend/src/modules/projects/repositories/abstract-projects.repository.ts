import { UpdateProjectDto } from '../dtos/update-project.dto';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { ResponseProjectsDto } from '../dtos/response-projects.dto';

export abstract class ProjectsRepository {
  abstract create(
    createProjectDto: CreateProjectDto,
  ): Promise<ResponseProjectsDto>;
  abstract findAll(): Promise<ResponseProjectsDto[]>;
  abstract findOne(id: string): Promise<ResponseProjectsDto>;
  abstract update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseProjectsDto>;
}
