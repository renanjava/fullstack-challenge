import { TimeTrackers } from '@prisma/client';

export class TimeTrackerEntity implements TimeTrackers {
  id: string;
  start_date: Date;
  end_date: Date;
  timezone_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  collaborator_id: string | null;
  task_id: string;
}
