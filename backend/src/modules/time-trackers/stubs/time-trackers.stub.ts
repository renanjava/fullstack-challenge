import { TimeTrackerEntity } from '../entities/time-tracker.entity';
import { faker } from '@faker-js/faker';

export class TimeTrackersStub implements TimeTrackerEntity {
  id: string;
  start_date: Date;
  end_date: Date;
  timezone_id: string;
  collaborator_id: string | null;
  task_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(data?: Partial<TimeTrackerEntity>) {
    this.id = data?.id ?? faker.database.mongodbObjectId();
    this.timezone_id = data?.timezone_id ?? faker.database.mongodbObjectId();
    this.collaborator_id =
      data?.collaborator_id ?? faker.database.mongodbObjectId();
    this.task_id = data?.task_id ?? faker.database.mongodbObjectId();
    this.start_date = data?.start_date ?? new Date();
    this.end_date = data?.end_date ?? new Date();
    this.created_at = data?.created_at ?? new Date();
    this.updated_at = data?.updated_at ?? new Date();
    this.deleted_at = data?.deleted_at ?? null;
  }
}
