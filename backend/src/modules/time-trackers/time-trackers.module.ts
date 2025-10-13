import { Module } from '@nestjs/common';
import { TimeTrackersService } from './time-trackers.service';
import { TimeTrackersController } from './time-trackers.controller';
import { TimeTrackersServiceWorker } from './time-trackers.worker';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL || 'amqp://admin:admin123@localhost:5672',
          ],
          queue:
            process.env.RABBITMQ_QUEUE_TIME_TRACKER || 'time-tracker-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [TimeTrackersController, TimeTrackersServiceWorker],
  providers: [TimeTrackersService, PrismaTimeTrackersRepository],
})
export class TimeTrackersModule {}
