import { CreateTimeTrackerDto } from '../../modules/time-trackers/dtos/create-time-tracker.dto';

export class CreateTimeTrackerMessageDto extends CreateTimeTrackerDto {
  userId?: string;
  correlationId: string;
  timestamp: Date;
}
