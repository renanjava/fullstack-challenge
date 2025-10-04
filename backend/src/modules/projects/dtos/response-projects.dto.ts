import { OmitType } from '@nestjs/mapped-types';
import { ProjectsEntity } from '../entities/project.entity';

export class ResponseProjectsDto extends OmitType(ProjectsEntity, [
  'deleted_at',
] as const) {}
