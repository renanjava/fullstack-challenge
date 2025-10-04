import { Projects } from '@prisma/client';

export class ProjectsEntity implements Projects {
  name: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
