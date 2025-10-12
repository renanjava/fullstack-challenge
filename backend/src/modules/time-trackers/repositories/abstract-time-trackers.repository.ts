import { UpdateTimeTrackerDto } from '../dtos/update-time-tracker.dto';
import { ResponseTimeTrackerDto } from '../dtos/response-time-tracker.dto';
import { CreateTimeTrackerDto } from '../dtos/create-time-tracker.dto';

export abstract class TimeTrackersRepository {
  abstract create(
    createProjectDto: CreateTimeTrackerDto,
  ): Promise<ResponseTimeTrackerDto>;
  abstract findAll(): Promise<ResponseTimeTrackerDto[]>;
  abstract findOne(id: string): Promise<ResponseTimeTrackerDto>;
  abstract update(
    id: string,
    updateTimeTrackersDto: UpdateTimeTrackerDto,
  ): Promise<ResponseTimeTrackerDto>;
  abstract verifyTimeConflict(
    endDate: Date,
    startDate: Date,
  ): Promise<ResponseTimeTrackerDto[]>;
  abstract getTimeTrackersFromDay(day: string): Promise<Record<string, any>>;
  abstract getTimeTrackersFromDayWhereCollaboratorId(
    day: string,
    collaboratorId: string,
  ): Promise<Record<string, any>>;
  abstract getTimeTrackersFromMonth(
    month: string,
  ): Promise<Record<string, any>>;
  abstract getTimeTrackersFromMonthWhereCollaboratorId(
    month: string,
    collaboratorId: string,
  ): Promise<Record<string, any>>;
  abstract getTimeTrackersFromMonthWhereProjectId(
    month: string,
    projectId: string,
  ): Promise<Record<string, any>>;
  abstract getTimeTrackersFromDayWhereProjectId(
    month: string,
    projectId: string,
  ): Promise<Record<string, any>>;
}
