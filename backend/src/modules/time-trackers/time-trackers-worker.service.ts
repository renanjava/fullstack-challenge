/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';
import { CreateTimeTrackerMessageDto } from '../../queue/dtos/create-time-tracker-message.dto';
import { RABBITMQ_PATTERNS } from '../../queue/constants/rabbitmq.constants';

@Injectable()
export class TimeTrackersWorkerService {
  private readonly logger = new Logger(TimeTrackersWorkerService.name);

  constructor(
    private readonly timeTrackersRepository: PrismaTimeTrackersRepository,
  ) {}

  @MessagePattern(RABBITMQ_PATTERNS.CREATE_TIME_TRACKER)
  async handleCreateTimeTracker(
    @Payload() data: CreateTimeTrackerMessageDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(
      `[WORKER] Processando time tracker. CorrelationId: ${data.correlationId}`,
    );

    try {
      const dateConflict = await this.timeTrackersRepository.verifyTimeConflict(
        data.end_date,
        data.start_date,
      );

      if (dateConflict.length > 0) {
        this.logger.warn(
          `[WORKER] Conflito de tempo detectado. CorrelationId: ${data.correlationId}`,
        );

        channel.ack(originalMsg);

        return {
          success: false,
          error: 'Já existe uma tarefa nesse intervalo de tempo',
          correlationId: data.correlationId,
        };
      }

      const timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const timeTracker = await this.timeTrackersRepository.create({
        ...data,
        timezone_id: timeZoneId,
      });

      this.logger.log(
        `[WORKER] Time tracker criado com sucesso. ID: ${timeTracker.id}, CorrelationId: ${data.correlationId}`,
      );

      channel.ack(originalMsg);

      return {
        success: true,
        data: timeTracker,
        correlationId: data.correlationId,
      };
    } catch (error) {
      this.logger.error(
        `[WORKER] Erro ao processar time tracker. CorrelationId: ${data.correlationId}`,
        error.stack,
      );

      channel.nack(originalMsg, false, true);

      throw error;
    }
  }
}
