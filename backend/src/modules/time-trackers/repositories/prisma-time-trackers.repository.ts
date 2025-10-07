import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateTimeTrackerDto } from '../dtos/update-time-tracker.dto';
import { TimeTrackersRepository } from './abstract-time-trackers.repository';
import { ResponseTimeTrackerDto } from '../dtos/response-time-tracker.dto';
import { CreateTimeTrackerDto } from '../dtos/create-time-tracker.dto';

@Injectable()
export class PrismaTimeTrackersRepository implements TimeTrackersRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  async create(
    createTimeTrackerDto: CreateTimeTrackerDto,
  ): Promise<ResponseTimeTrackerDto> {
    return await this.prismaClient.timeTrackers.create({
      data: createTimeTrackerDto,
      omit: { deleted_at: true },
      include: { collaborators: true, tasks: true },
    });
  }
  async findAll(): Promise<ResponseTimeTrackerDto[]> {
    return await this.prismaClient.timeTrackers.findMany({
      where: { deleted_at: null },
      omit: { deleted_at: true },
      include: { collaborators: true, tasks: true },
    });
  }
  async findOne(id: string): Promise<ResponseTimeTrackerDto> {
    return await this.prismaClient.timeTrackers.findUniqueOrThrow({
      where: { id, deleted_at: null },
      omit: { deleted_at: true },
      include: { collaborators: true, tasks: true },
    });
  }
  async verifyTimeConflict(
    endDate: Date,
    startDate: Date,
  ): Promise<ResponseTimeTrackerDto[]> {
    return await this.prismaClient.$queryRaw`
      SELECT * 
      FROM "TimeTrackers" t 
      WHERE t."StartDate" < ${endDate} 
      AND ${startDate} < t."EndDate";
    `;
  }

  async getTimeTrackersFromDay(day: string): Promise<Record<string, any>> {
    return await this.prismaClient.$queryRaw`
      SELECT
      ${day} AS day,
      SUM(
        EXTRACT(
          EPOCH FROM LEAST(t."EndDate", ${day}::date + INTERVAL '1 day') 
             - GREATEST(t."StartDate", ${day}::date))) / 3600 AS hours_in_day
      FROM "TimeTrackers" t
      WHERE t."StartDate" < ${day}::date + INTERVAL '1 day'
      AND t."EndDate"   > ${day}::date;
    `;
  }

  async getTimeTrackersFromMonth(month: string): Promise<Record<string, any>> {
    return await this.prismaClient.$queryRaw`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', ${month}::date), 'YYYY-MM') AS month,
        SUM(
          EXTRACT(
            EPOCH FROM LEAST(t."EndDate", DATE_TRUNC('month', ${month}::date) + INTERVAL '1 month') 
                  - GREATEST(t."StartDate", DATE_TRUNC('month', ${month}::date)))
        ) / 3600 AS hours_in_month
      FROM "TimeTrackers" t
      WHERE t."StartDate" < DATE_TRUNC('month', ${month}::date) + INTERVAL '1 month'
        AND t."EndDate"   > DATE_TRUNC('month', ${month}::date);
    `;
  }

  async update(
    id: string,
    updateTimeTrackerDto: UpdateTimeTrackerDto,
  ): Promise<ResponseTimeTrackerDto> {
    return await this.prismaClient.timeTrackers.update({
      where: { id },
      include: { collaborators: true, tasks: true },
      data: updateTimeTrackerDto,
    });
  }
}
