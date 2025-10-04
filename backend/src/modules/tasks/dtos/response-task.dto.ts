import { OmitType } from '@nestjs/mapped-types';
import { TasksEntity } from '../entities/task.entity';

export class ResponseTaskDto extends OmitType(TasksEntity, [
  'deleted_at',
] as const) {}
