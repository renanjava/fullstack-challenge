import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeTrackerDto } from './create-time-tracker.dto';

export class UpdateTimeTrackerDto extends PartialType(CreateTimeTrackerDto) {}
