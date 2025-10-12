import { Test, TestingModule } from '@nestjs/testing';
import { TimeTrackersController } from '../time-trackers.controller';
import { TimeTrackersService } from '../time-trackers.service';
import { TimeTrackersStub } from '../stubs/time-trackers.stub';
import { mockTimeTrackersService } from '../mocks/time-trackers-service.mock';
import { UpdateTimeTrackerDto } from '../dtos/update-time-tracker.dto';
import { CreateTimeTrackerDto } from '../dtos/create-time-tracker.dto';
import { GetDateTimeTrackersDto } from '../dtos/get-date-time-trackers.dto';

describe('TimeTrackersController', () => {
  let controller: TimeTrackersController;
  const timeTrackersService = mockTimeTrackersService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeTrackersController],
      providers: [
        { provide: TimeTrackersService, useValue: timeTrackersService },
      ],
    }).compile();

    controller = module.get<TimeTrackersController>(TimeTrackersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create timetrackers correctly', async () => {
    const timeTracker = new TimeTrackersStub();
    timeTrackersService.create.mockResolvedValue(timeTracker);
    const result = await controller.create(timeTracker as CreateTimeTrackerDto);

    expect(result).toEqual(timeTracker);
    expect(timeTrackersService.create).toHaveBeenCalledWith(
      timeTracker as CreateTimeTrackerDto,
    );
  });

  it('should find all timetrackers correctly', async () => {
    const timetrackerOne = new TimeTrackersStub();
    const timetrackerTwo = new TimeTrackersStub();
    timeTrackersService.findAll.mockResolvedValue([
      timetrackerOne,
      timetrackerTwo,
    ]);
    const result = await controller.findAll();

    expect(result).toEqual([timetrackerOne, timetrackerTwo]);
    expect(timeTrackersService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one timetracker correctly', async () => {
    const timeTracker = new TimeTrackersStub();
    timeTrackersService.findOne.mockResolvedValue(timeTracker);
    const result = await controller.findOne(timeTracker.id);

    expect(result).toEqual(timeTracker);
    expect(timeTrackersService.findOne).toHaveBeenCalledWith(timeTracker.id);
  });

  it('should get time trackers from day correctly', async () => {
    const mockResult = { day: '2024-01-01', hours_in_day: 8 };
    const dto = { date: '2024-01-01' } as GetDateTimeTrackersDto;
    timeTrackersService.getTimeTrackersFromDay.mockResolvedValue(mockResult);
    const result = await controller.getTimeTrackersFromDay(dto);

    expect(result).toEqual(mockResult);
    expect(timeTrackersService.getTimeTrackersFromDay).toHaveBeenCalledWith(
      dto.date,
    );
  });

  it('should get time trackers from month correctly', async () => {
    const mockResult = { month: '2024-01', hours_in_month: 160 };
    const dto = { date: '2024-01-01' } as GetDateTimeTrackersDto;
    timeTrackersService.getTimeTrackersFromMonth.mockResolvedValue(mockResult);
    const result = await controller.getTimeTrackersFromMonth(dto);

    expect(result).toEqual(mockResult);
    expect(timeTrackersService.getTimeTrackersFromMonth).toHaveBeenCalledWith(
      dto.date,
    );
  });

  it('should get time trackers from day where collaborator id correctly', async () => {
    const mockResult = { day: '2024-01-01', hours_in_day: 8 };
    const dto = {
      id: 'collaborator-id',
      date: '2024-01-01',
    } as GetDateTimeTrackersDto;
    timeTrackersService.getTimeTrackersFromDayWhereCollaboratorId.mockResolvedValue(
      mockResult,
    );
    const result =
      await controller.getTimeTrackersFromDayWhereCollaboratorId(dto);

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersService.getTimeTrackersFromDayWhereCollaboratorId,
    ).toHaveBeenCalledWith(dto.id, dto.date);
  });

  it('should get time trackers from month where collaborator id correctly', async () => {
    const mockResult = { month: '2024-01', hours_in_month: 160 };
    const dto = {
      id: 'collaborator-id',
      date: '2024-01-01',
    } as GetDateTimeTrackersDto;
    timeTrackersService.getTimeTrackersFromMonthWhereCollaboratorId.mockResolvedValue(
      mockResult,
    );
    const result =
      await controller.getTimeTrackersFromMonthWhereCollaboratorId(dto);

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersService.getTimeTrackersFromMonthWhereCollaboratorId,
    ).toHaveBeenCalledWith(dto.id, dto.date);
  });

  it('should get time trackers from day where project id correctly', async () => {
    const mockResult = { day: '2024-01-01', hours_in_day: 8 };
    const dto = {
      id: 'project-id',
      date: '2024-01-01',
    } as GetDateTimeTrackersDto;
    timeTrackersService.getTimeTrackersFromDayWhereProjectId.mockResolvedValue(
      mockResult,
    );
    const result = await controller.getTimeTrackersFromDayWhereProjectId(dto);

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersService.getTimeTrackersFromDayWhereProjectId,
    ).toHaveBeenCalledWith(dto.id, dto.date);
  });

  it('should get time trackers from month where project id correctly', async () => {
    const mockResult = { month: '2024-01', hours_in_month: 160 };
    const dto = {
      id: 'project-id',
      date: '2024-01-01',
    } as GetDateTimeTrackersDto;
    timeTrackersService.getTimeTrackersFromMonthWhereProjectId.mockResolvedValue(
      mockResult,
    );
    const result = await controller.getTimeTrackersFromMonthWhereProjectId(dto);

    expect(result).toEqual(mockResult);
    expect(
      timeTrackersService.getTimeTrackersFromMonthWhereProjectId,
    ).toHaveBeenCalledWith(dto.id, dto.date);
  });

  it('should update timetracker correctly', async () => {
    const timeTracker = new TimeTrackersStub();
    const now = new Date();
    timeTrackersService.update.mockResolvedValue({
      ...timeTracker,
      updated_at: now,
    });
    const result = await controller.update(timeTracker.id, {
      updated_at: now,
    } as UpdateTimeTrackerDto);

    expect(result).toEqual({ ...timeTracker, updated_at: now });
    expect(timeTrackersService.update).toHaveBeenCalledWith(timeTracker.id, {
      updated_at: now,
    });
  });

  it('should active timetracker correctly', async () => {
    const now = new Date();
    const timeTracker = new TimeTrackersStub({ deleted_at: now });
    timeTrackersService.active.mockResolvedValue({
      ...timeTracker,
      deleted_at: null,
    });
    const result = await controller.active(timeTracker.id);

    expect(result).toEqual({ ...timeTracker, deleted_at: null });
    expect(timeTrackersService.active).toHaveBeenCalledWith(timeTracker.id);
  });

  it('should softRemove timetracker correctly', async () => {
    const now = new Date();
    const timeTracker = new TimeTrackersStub({ deleted_at: null });
    timeTrackersService.softRemove.mockResolvedValue({
      ...timeTracker,
      deleted_at: now,
    });
    const result = await controller.softRemove(timeTracker.id);

    expect(result).toEqual({ ...timeTracker, deleted_at: now });
    expect(timeTrackersService.softRemove).toHaveBeenCalledWith(timeTracker.id);
  });
});
