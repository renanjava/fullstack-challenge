/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaTimeTrackersRepository } from './repositories/prisma-time-trackers.repository';
import {
  BadRequestException,
  Injectable,
  Inject,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTimeTrackerDto } from './dtos/create-time-tracker.dto';
import { UpdateTimeTrackerDto } from './dtos/update-time-tracker.dto';
import { RABBITMQ_PATTERNS } from '../../queue/constants/rabbitmq.constants';
import { CreateTimeTrackerMessageDto } from '../../queue/dtos/create-time-tracker-message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TimeTrackersService {
  private readonly logger = new Logger(TimeTrackersService.name);

  constructor(
    private readonly timeTrackersRepository: PrismaTimeTrackersRepository,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  async create(createTimeTrackerDto: CreateTimeTrackerDto) {
    const endDate = createTimeTrackerDto.end_date;
    const startDate = createTimeTrackerDto.start_date;

    if (startDate > endDate) {
      throw new BadRequestException(
        'A data de início é maior que a data de fim',
      );
    }

    const dateConflict = await this.timeTrackersRepository.verifyTimeConflict(
      endDate,
      startDate,
    );
    if (dateConflict.length > 0) {
      throw new ConflictException(
        'Já existe uma tarefa nesse intervalo de tempo',
      );
    }

    const timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const message: CreateTimeTrackerMessageDto = {
      ...createTimeTrackerDto,
      timezone_id: timeZoneId,
      correlationId: uuidv4(),
      timestamp: new Date(),
    };

    this.logger.log(
      `Enviando time tracker para fila. CorrelationId: ${message.correlationId}`,
    );

    try {
      this.rabbitClient.emit(RABBITMQ_PATTERNS.CREATE_TIME_TRACKER, message);

      return {
        ...createTimeTrackerDto,
        timezone_id: timeZoneId,
        message: 'Time tracker enviado para processamento',
        correlationId: message.correlationId,
        status: 'pending',
      };
    } catch (error) {
      this.logger.error(
        `Erro ao enviar para fila: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Erro ao processar requisição');
    }
  }

  async findAll() {
    return await this.timeTrackersRepository.findAll();
  }

  async findOne(id: string) {
    return await this.timeTrackersRepository.findOne(id);
  }

  async getTimeTrackersFromDay(day: string) {
    return await this.timeTrackersRepository.getTimeTrackersFromDay(day);
  }

  async getTimeTrackersFromMonth(month: string) {
    return await this.timeTrackersRepository.getTimeTrackersFromMonth(month);
  }

  async getTimeTrackersFromMonthWhereCollaboratorId(
    collaborator_id: string,
    month: string,
  ) {
    return await this.timeTrackersRepository.getTimeTrackersFromMonthWhereCollaboratorId(
      month,
      collaborator_id,
    );
  }

  async getTimeTrackersFromDayWhereCollaboratorId(
    collaborator_id: string,
    day: string,
  ) {
    return await this.timeTrackersRepository.getTimeTrackersFromDayWhereCollaboratorId(
      day,
      collaborator_id,
    );
  }

  async getTimeTrackersFromMonthWhereProjectId(
    project_id: string,
    month: string,
  ) {
    return await this.timeTrackersRepository.getTimeTrackersFromMonthWhereProjectId(
      month,
      project_id,
    );
  }

  async getTimeTrackersFromDayWhereProjectId(project_id: string, day: string) {
    return await this.timeTrackersRepository.getTimeTrackersFromDayWhereProjectId(
      day,
      project_id,
    );
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
