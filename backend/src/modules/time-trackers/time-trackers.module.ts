import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../../prisma/prisma.module';
import { TimeTrackersController } from './time-trackers.controller';
import { TimeTrackersService } from './time-trackers.service';
import { TimeTrackersServiceWorker } from './time-trackers.worker';
import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const rabbitUrl = configService.get<string>('RABBITMQ_URL');
          const queueName = configService.get<string>(
            'RABBITMQ_QUEUE_TIME_TRACKER',
          );
          if (!rabbitUrl) {
            throw new Error('RABBITMQ_URL não definida no .env');
          }
          if (!queueName) {
            throw new Error('RABBITMQ_QUEUE_TIME_TRACKER não definida no .env');
          }
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitUrl],
              queue: queueName,
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
  controllers: [TimeTrackersController, TimeTrackersServiceWorker],
  providers: [TimeTrackersService, PrismaTimeTrackersRepository],
})
export class TimeTrackersModule {}
