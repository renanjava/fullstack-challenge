import { Users } from '@prisma/client';

export class UsersEntity implements Users {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
