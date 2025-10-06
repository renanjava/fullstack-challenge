import { Test, TestingModule } from '@nestjs/testing';
import { TimeTrackersService } from '../time-trackers.service';
import { TimeTrackersStub } from '../stubs/time-trackers.stub';
import { UpdateTimeTrackerDto } from '../dtos/update-time-tracker.dto';
import { mockTimeTrackersRepository } from '../mocks/time-trackers-repository.mock';
import { PrismaTimeTrackersRepository } from '../repositories/prisma-time-trackers.repository';
import { CreateTimeTrackerDto } from '../dtos/create-time-tracker.dto';

describe('TimeTrackersService', () => {
  let service: TimeTrackersService;
  const timeTrackersRepository = mockTimeTrackersRepository();

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
      ],
    }).compile();

    service = module.get<TimeTrackersService>(TimeTrackersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create timetrackers correctly', async () => {
    const timeTracker = new TimeTrackersStub();
    timeTrackersRepository.create.mockResolvedValue(timeTracker);
    timeTrackersRepository.verifyTimeConflict.mockResolvedValue([]);
    const result = await service.create(timeTracker as CreateTimeTrackerDto);

    expect(result).toEqual(timeTracker);
    expect(timeTrackersRepository.create).toHaveBeenCalledWith(
      timeTracker as CreateTimeTrackerDto,
    );
    expect(timeTrackersRepository.verifyTimeConflict).toHaveBeenCalledWith(
      timeTracker.end_date,
      timeTracker.start_date,
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
