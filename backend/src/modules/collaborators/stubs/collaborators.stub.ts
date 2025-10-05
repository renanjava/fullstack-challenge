import { CollaboratorsEntity } from '../entities/collaborator.entity';
import { faker } from '@faker-js/faker';

export class CollaboratorsStub implements CollaboratorsEntity {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(data?: Partial<CollaboratorsEntity>) {
    this.id = data?.id ?? faker.database.mongodbObjectId();
    this.name = data?.name ?? faker.person.fullName();
    this.user_id = data?.id ?? faker.database.mongodbObjectId();
    this.created_at = data?.created_at ?? new Date();
    this.updated_at = data?.updated_at ?? new Date();
    this.deleted_at = data?.deleted_at ?? null;
  }
}
