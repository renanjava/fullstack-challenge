import { Module } from '@nestjs/common';
import { TimeTrackersService } from './time-trackers.service';
import { TimeTrackersController } from './time-trackers.controller';
import { TimeTrackersWorkerService } from './time-trackers-worker.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';
import { RabbitmqModule } from '../../queue/rabbitmq.module';

@Module({
  imports: [PrismaModule, RabbitmqModule],
  controllers: [TimeTrackersController],
  providers: [
    TimeTrackersService,
    TimeTrackersWorkerService,
    PrismaTimeTrackersRepository,
  ],
})
export class TimeTrackersModule {}
