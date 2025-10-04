import { OmitType } from '@nestjs/mapped-types';
import { TimeTrackerEntity } from '../entities/time-tracker.entity';

export class ResponseTimeTrackerDto extends OmitType(TimeTrackerEntity, [
  'deleted_at',
] as const) {}
