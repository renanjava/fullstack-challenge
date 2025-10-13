import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeTrackersService } from './time-trackers.service';
import { CreateTimeTrackerDto } from './dtos/create-time-tracker.dto';
import { UpdateTimeTrackerDto } from './dtos/update-time-tracker.dto';
import { GetDateTimeTrackersDto } from './dtos/get-date-time-trackers.dto';
import {
  CreatedResponseDecorator,
  OkResponseDecorator,
  ValidationBadRequestResponseDecorator,
  NotFoundEntityResponseDecorator,
  ConflictResponseDecorator,
  UsuarioUnauthorizedResponseDecorator,
  ForbiddenResponseDecorator,
  timeTrackerResponseExample,
} from '../../common/decorators/swagger-api.decorator';

@ApiTags('Time Trackers')
@Controller('time-trackers')
export class TimeTrackersController {
  constructor(private readonly timeTrackersService: TimeTrackersService) {}

  @Post()
  @CreatedResponseDecorator(
    'Time tracker criado com sucesso',
    timeTrackerResponseExample,
  )
  @ValidationBadRequestResponseDecorator()
  @ConflictResponseDecorator('Já existe uma tarefa nesse intervalo de tempo')
  @ForbiddenResponseDecorator('A data de início é maior que a data de fim')
  @UsuarioUnauthorizedResponseDecorator()
  async create(@Body() createTimeTrackerDto: CreateTimeTrackerDto) {
    return this.timeTrackersService.create(createTimeTrackerDto);
  }

  @Get()
  @OkResponseDecorator('Lista de time trackers retornada com sucesso', [
    timeTrackerResponseExample,
  ])
  @UsuarioUnauthorizedResponseDecorator()
  async findAll() {
    return this.timeTrackersService.findAll();
  }

  @Get(':id')
  @OkResponseDecorator(
    'Time tracker encontrado com sucesso',
    timeTrackerResponseExample,
  )
  @NotFoundEntityResponseDecorator('Time Tracker', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async findOne(@Param('id') id: string) {
    return this.timeTrackersService.findOne(id);
  }

  @Get('day/:date')
  @OkResponseDecorator('Horas totais do dia retornadas com sucesso', {
    day: '2025-01-15',
    hours_in_day: 8.5,
  })
  @ValidationBadRequestResponseDecorator()
  @UsuarioUnauthorizedResponseDecorator()
  async getTimeTrackersFromDay(
    @Param() getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return this.timeTrackersService.getTimeTrackersFromDay(
      getDateTimeTrackersDto.date,
    );
  }

  @Get('month/:date')
  @OkResponseDecorator('Horas totais do mês retornadas com sucesso', {
    month: '2025-01',
    hours_in_month: 160,
  })
  @ValidationBadRequestResponseDecorator()
  @UsuarioUnauthorizedResponseDecorator()
  async getTimeTrackersFromMonth(
    @Param() getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return this.timeTrackersService.getTimeTrackersFromMonth(
      getDateTimeTrackersDto.date,
    );
  }

  @Get('collaborator/:id/day/:date')
  @OkResponseDecorator('Horas do colaborador no dia retornadas com sucesso', {
    day: '2025-01-15',
    hours_in_day: 8.5,
  })
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Colaborador', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async getTimeTrackersFromDayWhereCollaboratorId(
    @Param() getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return this.timeTrackersService.getTimeTrackersFromDayWhereCollaboratorId(
      getDateTimeTrackersDto.id,
      getDateTimeTrackersDto.date,
    );
  }

  @Get('collaborator/:id/month/:date')
  @OkResponseDecorator('Horas do colaborador no mês retornadas com sucesso', {
    month: '2025-01',
    hours_in_month: 160,
  })
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Colaborador', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async getTimeTrackersFromMonthWhereCollaboratorId(
    @Param()
    getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return this.timeTrackersService.getTimeTrackersFromMonthWhereCollaboratorId(
      getDateTimeTrackersDto.id,
      getDateTimeTrackersDto.date,
    );
  }

  @Get('project/:id/day/:date')
  @OkResponseDecorator('Horas do projeto no dia retornadas com sucesso', {
    day: '2025-01-15',
    hours_in_day: 8.5,
  })
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Projeto', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async getTimeTrackersFromDayWhereProjectId(
    @Param() getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return this.timeTrackersService.getTimeTrackersFromDayWhereProjectId(
      getDateTimeTrackersDto.id,
      getDateTimeTrackersDto.date,
    );
  }

  @Get('project/:id/month/:date')
  @OkResponseDecorator('Horas do projeto no mês retornadas com sucesso', {
    month: '2025-01',
    hours_in_month: 160,
  })
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Projeto', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async getTimeTrackersFromMonthWhereProjectId(
    @Param()
    getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return await this.timeTrackersService.getTimeTrackersFromMonthWhereProjectId(
      getDateTimeTrackersDto.id,
      getDateTimeTrackersDto.date,
    );
  }

  @Patch(':id')
  @OkResponseDecorator(
    'Time tracker atualizado com sucesso',
    timeTrackerResponseExample,
  )
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Time Tracker', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async update(
    @Param('id') id: string,
    @Body() updateTimeTrackerDto: UpdateTimeTrackerDto,
  ) {
    return this.timeTrackersService.update(id, updateTimeTrackerDto);
  }

  @Patch('active/:id')
  @OkResponseDecorator(
    'Time tracker reativado com sucesso',
    timeTrackerResponseExample,
  )
  @NotFoundEntityResponseDecorator('Time Tracker', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async active(@Param('id') id: string) {
    return this.timeTrackersService.active(id);
  }

  @Delete(':id')
  @OkResponseDecorator('Time tracker removido com sucesso (soft delete)', {
    ...timeTrackerResponseExample,
    deletedAt: '2025-01-01T00:00:00.000Z',
  })
  @NotFoundEntityResponseDecorator('Time Tracker', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async softRemove(@Param('id') id: string) {
    return this.timeTrackersService.softRemove(id);
  }
}
