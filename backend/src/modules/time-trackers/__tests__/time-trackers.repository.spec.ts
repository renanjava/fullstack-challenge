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
      deleted_at: null,
    } as UpdateTimeTrackerDto);

    expect(result).toEqual({ ...timetracker, deleted_at: now });
    expect(prismaService.timeTrackers.update).toHaveBeenCalledWith({
      where: { id: timetracker.id },
      include: { collaborators: true, tasks: true },
      data: {
        deleted_at: null,
      },
    });
  });
});
