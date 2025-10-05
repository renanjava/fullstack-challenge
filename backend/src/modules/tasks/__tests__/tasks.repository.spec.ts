import { Test, TestingModule } from '@nestjs/testing';
import { TasksStub } from '../stubs/tasks.stub';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { PrismaTasksRepository } from '../repositories/prisma-tasks.repository';
import { mockPrismaService } from '../../../prisma/mocks/prisma-service.mock';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTaskDto } from '../dtos/create-task.dto';

describe('TasksRepository', () => {
  let repository: PrismaTasksRepository;
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
        PrismaTasksRepository,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    repository = module.get<PrismaTasksRepository>(PrismaTasksRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create tasks correctly', async () => {
    const task = new TasksStub();
    prismaService.tasks.create.mockResolvedValue(task);
    const result = await repository.create(task as CreateTaskDto);

    expect(result).toEqual(task);
    expect(prismaService.tasks.create).toHaveBeenCalledWith({
      data: task as CreateTaskDto,
      omit: { deleted_at: true },
      include: { project: true },
    });
  });

  it('should find all tasks correctly', async () => {
    const taskOne = new TasksStub();
    const taskTwo = new TasksStub();
    prismaService.tasks.findMany.mockResolvedValue([taskOne, taskTwo]);
    const result = await repository.findAll();

    expect(result).toEqual([taskOne, taskTwo]);
    expect(prismaService.tasks.findMany).toHaveBeenCalledTimes(1);
  });

  it('should find one task correctly', async () => {
    const task = new TasksStub();
    prismaService.tasks.findUniqueOrThrow.mockResolvedValue(task);
    const result = await repository.findOne(task.id);

    expect(result).toEqual(task);
    expect(prismaService.tasks.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: task.id, deleted_at: null },
      omit: { deleted_at: true },
      include: { project: true },
    });
  });

  it('should update task correctly', async () => {
    const task = new TasksStub();
    const now = new Date();
    prismaService.tasks.update.mockResolvedValue({
      ...task,
      updated_at: now,
    });
    const result = await repository.update(task.id, {
      updated_at: now,
    } as UpdateTaskDto);

    expect(result).toEqual({ ...task, updated_at: now });
    expect(prismaService.tasks.update).toHaveBeenCalledWith({
      where: { id: task.id },
      include: { project: true },
      data: {
        updated_at: now,
      },
    });
  });

  it('should active task correctly', async () => {
    const now = new Date();
    const task = new TasksStub({ deleted_at: now });
    prismaService.tasks.update.mockResolvedValue({
      ...task,
      deleted_at: null,
    });
    const result = await repository.update(task.id, {
      deleted_at: null,
    } as UpdateTaskDto);

    expect(result).toEqual({ ...task, deleted_at: null });
    expect(prismaService.tasks.update).toHaveBeenCalledWith({
      where: { id: task.id },
      include: { project: true },
      data: {
        deleted_at: null,
      },
    });
  });

  it('should softRemove task correctly', async () => {
    const now = new Date();
    const task = new TasksStub({ deleted_at: null });
    prismaService.tasks.update.mockResolvedValue({
      ...task,
      deleted_at: now,
    });
    const result = await repository.update(task.id, {
      deleted_at: null,
    } as UpdateTaskDto);

    expect(result).toEqual({ ...task, deleted_at: now });
    expect(prismaService.tasks.update).toHaveBeenCalledWith({
      where: { id: task.id },
      include: { project: true },
      data: {
        deleted_at: null,
      },
    });
  });
});
