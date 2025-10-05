import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { TasksStub } from '../stubs/tasks.stub';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { mockTasksRepository } from '../mocks/tasks-repository.mock';
import { PrismaTasksRepository } from '../repositories/prisma-tasks.repository';
import { CreateTaskDto } from '../dtos/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  const tasksRepository = mockTasksRepository();

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
        TasksService,
        {
          provide: PrismaTasksRepository,
          useValue: tasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create tasks correctly', async () => {
    const task = new TasksStub();
    tasksRepository.create.mockResolvedValue(task);
    const result = await service.create(task as CreateTaskDto);

    expect(result).toEqual(task);
    expect(tasksRepository.create).toHaveBeenCalledWith(task as CreateTaskDto);
  });

  it('should find all tasks correctly', async () => {
    const taskOne = new TasksStub();
    const taskTwo = new TasksStub();
    tasksRepository.findAll.mockResolvedValue([taskOne, taskTwo]);
    const result = await service.findAll();

    expect(result).toEqual([taskOne, taskTwo]);
    expect(tasksRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one task correctly', async () => {
    const task = new TasksStub();
    tasksRepository.findOne.mockResolvedValue(task);
    const result = await service.findOne(task.id);

    expect(result).toEqual(task);
    expect(tasksRepository.findOne).toHaveBeenCalledWith(task.id);
  });

  it('should update task correctly', async () => {
    const task = new TasksStub();
    const now = new Date();
    tasksRepository.update.mockResolvedValue({
      ...task,
      updated_at: now,
    });
    const result = await service.update(task.id, {
      updated_at: now,
    } as UpdateTaskDto);

    expect(result).toEqual({ ...task, updated_at: now });
    expect(tasksRepository.update).toHaveBeenCalledWith(task.id, {
      updated_at: now,
    });
  });

  it('should active task correctly', async () => {
    const now = new Date();
    const task = new TasksStub({ deleted_at: now });
    tasksRepository.update.mockResolvedValue({
      ...task,
      deleted_at: null,
    });
    const result = await service.active(task.id);

    expect(result).toEqual({ ...task, deleted_at: null });
    expect(tasksRepository.update).toHaveBeenCalledWith(task.id, {
      deleted_at: null,
    });
  });

  it('should softRemove task correctly', async () => {
    const now = new Date();
    const task = new TasksStub({ deleted_at: null });
    tasksRepository.update.mockResolvedValue({
      ...task,
      deleted_at: now,
    });
    const result = await service.softRemove(task.id);

    expect(result).toEqual({ ...task, deleted_at: now });
    expect(tasksRepository.update).toHaveBeenCalledWith(task.id, {
      deleted_at: now,
    });
  });
});
