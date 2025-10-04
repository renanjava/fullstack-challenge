import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';
import { Injectable } from '@nestjs/common';
import { CreateTimeTrackerDto } from './dtos/create-time-tracker.dto';
import { UpdateTimeTrackerDto } from './dtos/update-time-tracker.dto';

@Injectable()
export class TimeTrackersService {
  constructor(
    private readonly timeTrackersRepository: PrismaTimeTrackersRepository,
  ) {}
  async create(createTimeTrackerDto: CreateTimeTrackerDto) {
    return await this.timeTrackersRepository.create(createTimeTrackerDto);
  }

  async findAll() {
    return await this.timeTrackersRepository.findAll();
  }

  async findOne(id: string) {
    return await this.timeTrackersRepository.findOne(id);
  }

  async update(id: string, updateTimeTrackerDto: UpdateTimeTrackerDto) {
    return await this.timeTrackersRepository.update(id, updateTimeTrackerDto);
  }

  async active(id: string) {
    return await this.timeTrackersRepository.update(id, {
      deleted_at: null,
    } as UpdateTimeTrackerDto);
  }

  async softRemove(id: string) {
    return await this.timeTrackersRepository.update(id, {
      deleted_at: new Date(),
    } as UpdateTimeTrackerDto);
  }
}
