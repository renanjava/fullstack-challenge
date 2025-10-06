import { UsersEntity } from '../entities/users.entity';
import { faker } from '@faker-js/faker';

export class UsersStub implements UsersEntity {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(data?: Partial<UsersEntity>) {
    this.id = data?.id ?? faker.database.mongodbObjectId();
    this.username = data?.username ?? faker.internet.userName();
    this.password = data?.password ?? faker.internet.password();
    this.created_at = data?.created_at ?? new Date();
    this.updated_at = data?.updated_at ?? new Date();
    this.deleted_at = data?.deleted_at ?? null;
  }
}
