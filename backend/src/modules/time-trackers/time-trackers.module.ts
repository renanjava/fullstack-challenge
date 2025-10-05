import { Module } from '@nestjs/common';
import { TimeTrackersService } from './time-trackers.service';
import { TimeTrackersController } from './time-trackers.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TimeTrackersController],
  providers: [TimeTrackersService, PrismaTimeTrackersRepository],
})
export class TimeTrackersModule {}
