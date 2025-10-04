import { Tasks } from '@prisma/client';

export class TasksEntity implements Tasks {
  name: string;
  id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  project_id: string;
}
