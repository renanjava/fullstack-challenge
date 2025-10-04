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
