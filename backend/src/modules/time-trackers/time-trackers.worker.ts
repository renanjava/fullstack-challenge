/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';
import { CreateTimeTrackerDto } from './dtos/create-time-tracker.dto';

@Controller()
export class TimeTrackersServiceWorker {
  private readonly logger = new Logger(TimeTrackersServiceWorker.name);

  constructor(
    private readonly timeTrackersRepository: PrismaTimeTrackersRepository,
  ) {}

  @EventPattern('time-tracker-created')
  async handleTimeTrackerCreated(@Payload() data: CreateTimeTrackerDto) {
    try {
      this.logger.log('🔥 Mensagem recebida do RabbitMQ');
      this.logger.log(`📋 Dados: ${JSON.stringify(data)}`);

      const result = await this.timeTrackersRepository.create(data);

      this.logger.log(`✅ Time tracker criado com sucesso: ${result.id}`);

      return result;
    } catch (error) {
      this.logger.error(
        `❌ Erro ao processar time tracker: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
