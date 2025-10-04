import { Collaborators } from '@prisma/client';

export class CollaboratorsEntity implements Collaborators {
  id: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
  name: string;
  user_id: string;
}
