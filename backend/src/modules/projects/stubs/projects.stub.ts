import { ProjectsEntity } from '../entities/project.entity';
import { faker } from '@faker-js/faker';

export class ProjectsStub implements ProjectsEntity {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(data?: Partial<ProjectsEntity>) {
    this.id = data?.id ?? faker.database.mongodbObjectId();
    this.name = data?.name ?? faker.commerce.productName();
    this.created_at = data?.created_at ?? new Date();
    this.updated_at = data?.updated_at ?? new Date();
    this.deleted_at = data?.deleted_at ?? null;
  }
}
