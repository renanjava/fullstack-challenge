import { Test, TestingModule } from '@nestjs/testing';
import { TimeTrackersStub } from '../stubs/time-trackers.stub';
import { UpdateTimeTrackerDto } from '../dtos/update-time-tracker.dto';
import { PrismaTimeTrackersRepository } from '../repositories/prisma-time-trackers.repository';
import { mockPrismaService } from '../../../prisma/mocks/prisma-service.mock';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTimeTrackerDto } from '../dtos/create-time-tracker.dto';

describe('TimeTrackersRepository', () => {
  let repository: PrismaTimeTrackersRepository;
  const prismaService = mockPrismaService();

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
        PrismaTimeTrackersRepository,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    repository = module.get<PrismaTimeTrackersRepository>(
      PrismaTimeTrackersRepository,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create timetrackers correctly', async () => {
    const timeTracker = new TimeTrackersStub();
    prismaService.timeTrackers.create.mockResolvedValue(timeTracker);
    const result = await repository.create(timeTracker as CreateTimeTrackerDto);

    expect(result).toEqual(timeTracker);
    expect(prismaService.timeTrackers.create).toHaveBeenCalledWith({
      data: timeTracker as CreateTimeTrackerDto,
      omit: { deleted_at: true },
      include: { collaborators: true, tasks: true },
    });
  });

  it('should find all timetrackers correctly', async () => {
    const timetrackerOne = new TimeTrackersStub();
    const timetrackerTwo = new TimeTrackersStub();
    prismaService.timeTrackers.findMany.mockResolvedValue([
      timetrackerOne,
      timetrackerTwo,
    ]);
    const result = await repository.findAll();

    expect(result).toEqual([timetrackerOne, timetrackerTwo]);
    expect(prismaService.timeTrackers.findMany).toHaveBeenCalledTimes(1);
  });

  it('should find one timetracker correctly', async () => {
    const timetracker = new TimeTrackersStub();
    prismaService.timeTrackers.findUniqueOrThrow.mockResolvedValue(timetracker);
    const result = await repository.findOne(timetracker.id);

    expect(result).toEqual(timetracker);
    expect(prismaService.timeTrackers.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: timetracker.id, deleted_at: null },
      omit: { deleted_at: true },
      include: { collaborators: true, tasks: true },
    });
  });

  it('should verify time conflict correctly', async () => {
    const timetracker = new TimeTrackersStub();
    const endDate = new Date('2024-01-02');
    const startDate = new Date('2024-01-01');
    prismaService.$queryRaw.mockResolvedValue([timetracker]);
    const result = await repository.verifyTimeConflict(endDate, startDate);

    expect(result).toEqual([timetracker]);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should get time trackers from day correctly', async () => {
    const mockResult = [{ day: '2024-01-01', hours_in_day: 8 }];
    const day = '2024-01-01';
    prismaService.$queryRaw.mockResolvedValue(mockResult);
    const result = await repository.getTimeTrackersFromDay(day);

    expect(result).toEqual(mockResult);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should get time trackers from month correctly', async () => {
    const mockResult = [{ month: '2024-01', hours_in_month: 160 }];
    const month = '2024-01-01';
    prismaService.$queryRaw.mockResolvedValue(mockResult);
    const result = await repository.getTimeTrackersFromMonth(month);

    expect(result).toEqual(mockResult);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should get time trackers from day where collaborator id correctly', async () => {
    const mockResult = [{ day: '2024-01-01', hours_in_day: 8 }];
    const day = '2024-01-01';
    const collaboratorId = 'collaborator-id';
    prismaService.$queryRaw.mockResolvedValue(mockResult);
    const result = await repository.getTimeTrackersFromDayWhereCollaboratorId(
      day,
      collaboratorId,
    );

    expect(result).toEqual(mockResult);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should get time trackers from month where collaborator id correctly', async () => {
    const mockResult = [{ month: '2024-01', hours_in_month: 160 }];
    const month = '2024-01-01';
    const collaboratorId = 'collaborator-id';
    prismaService.$queryRaw.mockResolvedValue(mockResult);
    const result = await repository.getTimeTrackersFromMonthWhereCollaboratorId(
      month,
      collaboratorId,
    );

    expect(result).toEqual(mockResult);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should get time trackers from day where project id correctly', async () => {
    const mockResult = [{ day: '2024-01-01', hours_in_day: 8 }];
    const day = '2024-01-01';
    const projectId = 'project-id';
    prismaService.$queryRaw.mockResolvedValue(mockResult);
    const result = await repository.getTimeTrackersFromDayWhereProjectId(
      day,
      projectId,
    );

    expect(result).toEqual(mockResult);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should get time trackers from month where project id correctly', async () => {
    const mockResult = [{ month: '2024-01', hours_in_month: 160 }];
    const month = '2024-01-01';
    const projectId = 'project-id';
    prismaService.$queryRaw.mockResolvedValue(mockResult);
    const result = await repository.getTimeTrackersFromMonthWhereProjectId(
      month,
      projectId,
    );

    expect(result).toEqual(mockResult);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should update timetracker correctly', async () => {
    const timetracker = new TimeTrackersStub();
    const now = new Date();
    prismaService.timeTrackers.update.mockResolvedValue({
      ...timetracker,
      updated_at: now,
    });
    const result = await repository.update(timetracker.id, {
      updated_at: now,
    } as UpdateTimeTrackerDto);

    expect(result).toEqual({ ...timetracker, updated_at: now });
    expect(prismaService.timeTrackers.update).toHaveBeenCalledWith({
      where: { id: timetracker.id },
      include: { collaborators: true, tasks: true },
      data: {
        updated_at: now,
      },
    });
  });

  it('should active timetracker correctly', async () => {
    const now = new Date();
    const timetracker = new TimeTrackersStub({ deleted_at: now });
    prismaService.timeTrackers.update.mockResolvedValue({
      ...timetracker,
      deleted_at: null,
    });
    const result = await repository.update(timetracker.id, {
      deleted_at: null,
    } as UpdateTimeTrackerDto);

    expect(result).toEqual({ ...timetracker, deleted_at: null });
    expect(prismaService.timeTrackers.update).toHaveBeenCalledWith({
      where: { id: timetracker.id },
      include: { collaborators: true, tasks: true },
      data: {
        deleted_at: null,
      },
    });
  });

  it('should softRemove timetracker correctly', async () => {
    const now = new Date();
    const timetracker = new TimeTrackersStub({ deleted_at: null });
    prismaService.timeTrackers.update.mockResolvedValue({
      ...timetracker,
      deleted_at: now,
    });
    const result = await repository.update(timetracker.id, {
      deleted_at: now,
    } as UpdateTimeTrackerDto);

    expect(result).toEqual({ ...timetracker, deleted_at: now });
    expect(prismaService.timeTrackers.update).toHaveBeenCalledWith({
      where: { id: timetracker.id },
      include: { collaborators: true, tasks: true },
      data: {
        deleted_at: now,
      },
    });
  });
});
