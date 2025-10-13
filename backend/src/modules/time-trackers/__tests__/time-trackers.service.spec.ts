/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TimeTrackersService } from '../time-trackers.service';
import { TimeTrackersStub } from '../stubs/time-trackers.stub';
import { UpdateTimeTrackerDto } from '../dtos/update-time-tracker.dto';
import { mockTimeTrackersRepository } from '../mocks/time-trackers-repository.mock';
import { PrismaTimeTrackersRepository } from '../repositories/prisma-time-trackers.repository';
import { CreateTimeTrackerDto } from '../dtos/create-time-tracker.dto';
import { v4 as uuidv4 } from 'uuid';
import { mockClientProxy } from '../../../queue/mocks/client-proxy.mock';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '00000000-0000-4000-8000-000000000000'),
}));

describe('TimeTrackersService', () => {
  let service: TimeTrackersService;
  const timeTrackersRepository = mockTimeTrackersRepository();
  const clientProxy = mockClientProxy();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeTrackersService,
        {
          provide: PrismaTimeTrackersRepository,
          useValue: timeTrackersRepository,
        },
        {
          provide: 'RABBITMQ_SERVICE',
          useValue: clientProxy,
        },
      ],
    }).compile();

    service = module.get<TimeTrackersService>(TimeTrackersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create timetrackers correctly with message from rabbitmq', async () => {
    const timeTracker = new TimeTrackersStub();
    const timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeTrackerWithCorrectTimeZoneId = {
      ...timeTracker,
      timezone_id: timeZoneId,
    };
    const rabbitmqMessage = {
      correlationId: '00000000-0000-4000-8000-000000000000',
      message: 'Time tracker enviado para processamento',
      status: 'pending',
    };
    timeTrackersRepository.verifyTimeConflict.mockResolvedValue([]);
    const result = await service.create(timeTracker as CreateTimeTrackerDto);

    expect(result).toEqual({
      ...rabbitmqMessage,
      data: { ...timeTrackerWithCorrectTimeZoneId },
    });
    expect(timeTrackersRepository.verifyTimeConflict).toHaveBeenCalledWith(
      timeTracker.end_date,
      timeTracker.start_date,
    );
  });

  it('should throw error when try create timetrackers with invalid dates', async () => {
    const timeTracker = new TimeTrackersStub({
      start_date: new Date('01-01-2025'),
      end_date: new Date('01-01-2024'),
    });

    await expect(
      service.create(timeTracker as CreateTimeTrackerDto),
    ).rejects.toThrow('A data de início é maior que a data de fim');
    expect(timeTrackersRepository.create).toHaveBeenCalledTimes(0);
    expect(timeTrackersRepository.verifyTimeConflict).toHaveBeenCalledTimes(0);
  });

  it('should throw error when try create timetrackers with conflict dates', async () => {
    const timeTracker = new TimeTrackersStub({
      start_date: new Date('01-01-2025'),
      end_date: new Date('01-01-2026'),
    });
    const otherTimeTracker = new TimeTrackersStub({
      start_date: new Date('02-02-2025'),
      end_date: new Date('04-04-2025'),
    });
    timeTrackersRepository.verifyTimeConflict.mockResolvedValue([timeTracker]);

    await expect(
      service.create(otherTimeTracker as CreateTimeTrackerDto),
    ).rejects.toThrow('Já existe uma tarefa nesse intervalo de tempo');
    expect(timeTrackersRepository.create).toHaveBeenCalledTimes(0);
    expect(timeTrackersRepository.verifyTimeConflict).toHaveBeenCalledWith(
      otherTimeTracker.end_date,
      otherTimeTracker.start_date,
    );
  });

  it('should find all timetrackers correctly', async () => {
    const timetrackerOne = new TimeTrackersStub();
    const timetrackerTwo = new TimeTrackersStub();
    timeTrackersRepository.findAll.mockResolvedValue([
      timetrackerOne,
      timetrackerTwo,
    ]);
    const result = await service.findAll();

    expect(result).toEqual([timetrackerOne, timetrackerTwo]);
    expect(timeTrackersRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one timetracker correctly', async () => {
    const timetracker = new TimeTrackersStub();
    timeTrackersRepository.findOne.mockResolvedValue(timetracker);
    const result = await service.findOne(timetracker.id);

    expect(result).toEqual(timetracker);
    expect(timeTrackersRepository.findOne).toHaveBeenCalledWith(timetracker.id);
  });

  it('should get time trackers from day correctly', async () => {
    const mockResult = { day: '2024-01-01', hours_in_day: 8 };
    const day = '2024-01-01';
    timeTrackersRepository.getTimeTrackersFromDay.mockResolvedValue(mockResult);
    const result = await service.getTimeTrackersFromDay(day);

    expect(result).toEqual(mockResult);
    expect(timeTrackersRepository.getTimeTrackersFromDay).toHaveBeenCalledWith(
      day,
    );
  });

  it('should get time trackers from month correctly', async () => {
    const mockResult = { month: '2024-01', hours_in_month: 160 };
    const month = '2024-01-01';
    timeTrackersRepository.getTimeTrackersFromMonth.mockResolvedValue(
      mockResult,
    );
    const result = await service.getTimeTrackersFromMonth(month);

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersRepository.getTimeTrackersFromMonth,
    ).toHaveBeenCalledWith(month);
  });

  it('should get time trackers from day where collaborator id correctly', async () => {
    const mockResult = { day: '2024-01-01', hours_in_day: 8 };
    const collaboratorId = 'collaborator-id';
    const day = '2024-01-01';
    timeTrackersRepository.getTimeTrackersFromDayWhereCollaboratorId.mockResolvedValue(
      mockResult,
    );
    const result = await service.getTimeTrackersFromDayWhereCollaboratorId(
      collaboratorId,
      day,
    );

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersRepository.getTimeTrackersFromDayWhereCollaboratorId,
    ).toHaveBeenCalledWith(day, collaboratorId);
  });

  it('should get time trackers from month where collaborator id correctly', async () => {
    const mockResult = { month: '2024-01', hours_in_month: 160 };
    const collaboratorId = 'collaborator-id';
    const month = '2024-01-01';
    timeTrackersRepository.getTimeTrackersFromMonthWhereCollaboratorId.mockResolvedValue(
      mockResult,
    );
    const result = await service.getTimeTrackersFromMonthWhereCollaboratorId(
      collaboratorId,
      month,
    );

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersRepository.getTimeTrackersFromMonthWhereCollaboratorId,
    ).toHaveBeenCalledWith(month, collaboratorId);
  });

  it('should get time trackers from day where project id correctly', async () => {
    const mockResult = { day: '2024-01-01', hours_in_day: 8 };
    const projectId = 'project-id';
    const day = '2024-01-01';
    timeTrackersRepository.getTimeTrackersFromDayWhereProjectId.mockResolvedValue(
      mockResult,
    );
    const result = await service.getTimeTrackersFromDayWhereProjectId(
      projectId,
      day,
    );

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersRepository.getTimeTrackersFromDayWhereProjectId,
    ).toHaveBeenCalledWith(day, projectId);
  });

  it('should get time trackers from month where project id correctly', async () => {
    const mockResult = { month: '2024-01', hours_in_month: 160 };
    const projectId = 'project-id';
    const month = '2024-01-01';
    timeTrackersRepository.getTimeTrackersFromMonthWhereProjectId.mockResolvedValue(
      mockResult,
    );
    const result = await service.getTimeTrackersFromMonthWhereProjectId(
      projectId,
      month,
    );

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersRepository.getTimeTrackersFromMonthWhereProjectId,
    ).toHaveBeenCalledWith(month, projectId);
  });

  it('should update timetracker correctly', async () => {
    const timetracker = new TimeTrackersStub();
    const now = new Date();
    timeTrackersRepository.update.mockResolvedValue({
      ...timetracker,
      updated_at: now,
    });
    const result = await service.update(timetracker.id, {
      updated_at: now,
    } as UpdateTimeTrackerDto);

    expect(result).toEqual({ ...timetracker, updated_at: now });
    expect(timeTrackersRepository.update).toHaveBeenCalledWith(timetracker.id, {
      updated_at: now,
    });
  });

  it('should active timetracker correctly', async () => {
    const now = new Date();
    const timetracker = new TimeTrackersStub({ deleted_at: now });
    timeTrackersRepository.update.mockResolvedValue({
      ...timetracker,
      deleted_at: null,
    });
    const result = await service.active(timetracker.id);

    expect(result).toEqual({ ...timetracker, deleted_at: null });
    expect(timeTrackersRepository.update).toHaveBeenCalledWith(timetracker.id, {
      deleted_at: null,
    });
  });

  it('should softRemove timetracker correctly', async () => {
    const now = new Date();
    const timetracker = new TimeTrackersStub({ deleted_at: null });
    timeTrackersRepository.update.mockResolvedValue({
      ...timetracker,
      deleted_at: now,
    });
    const result = await service.softRemove(timetracker.id);

    expect(result).toEqual({ ...timetracker, deleted_at: now });
    expect(timeTrackersRepository.update).toHaveBeenCalledWith(timetracker.id, {
      deleted_at: now,
    });
  });
});
