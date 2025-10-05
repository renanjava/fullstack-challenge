import { TasksEntity } from '../entities/task.entity';
import { faker } from '@faker-js/faker';

export class TasksStub implements TasksEntity {
  id: string;
  name: string;
  description: string;
  project_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(data?: Partial<TasksEntity>) {
    this.id = data?.id ?? faker.database.mongodbObjectId();
    this.project_id = data?.project_id ?? faker.database.mongodbObjectId();
    this.name = data?.name ?? faker.person.firstName();
    this.description = data?.description ?? faker.person.fullName();
    this.created_at = data?.created_at ?? new Date();
    this.updated_at = data?.updated_at ?? new Date();
    this.deleted_at = data?.deleted_at ?? null;
  }
}
