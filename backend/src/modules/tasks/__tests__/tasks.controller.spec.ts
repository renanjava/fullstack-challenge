import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';
import { TasksStub } from '../stubs/tasks.stub';
import { mockTasksService } from '../mocks/tasks-service.mock';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  const tasksService = mockTasksService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: tasksService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create tasks correctly', async () => {
    const task = new TasksStub();
    tasksService.create.mockResolvedValue(task);
    const result = await controller.create(task as CreateTaskDto);

    expect(result).toEqual(task);
    expect(tasksService.create).toHaveBeenCalledWith(task as CreateTaskDto);
  });

  it('should find all tasks correctly', async () => {
    const taskOne = new TasksStub();
    const taskTwo = new TasksStub();
    tasksService.findAll.mockResolvedValue([taskOne, taskTwo]);
    const result = await controller.findAll();

    expect(result).toEqual([taskOne, taskTwo]);
    expect(tasksService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one task correctly', async () => {
    const task = new TasksStub();
    tasksService.findOne.mockResolvedValue(task);
    const result = await controller.findOne(task.id);

    expect(result).toEqual(task);
    expect(tasksService.findOne).toHaveBeenCalledWith(task.id);
  });

  it('should update task correctly', async () => {
    const task = new TasksStub();
    const now = new Date();
    tasksService.update.mockResolvedValue({
      ...task,
      updated_at: now,
    });
    const result = await controller.update(task.id, {
      updated_at: now,
    } as UpdateTaskDto);

    expect(result).toEqual({ ...task, updated_at: now });
    expect(tasksService.update).toHaveBeenCalledWith(task.id, {
      updated_at: now,
    });
  });

  it('should active task correctly', async () => {
    const now = new Date();
    const task = new TasksStub({ deleted_at: now });
    tasksService.active.mockResolvedValue({
      ...task,
      deleted_at: null,
    });
    const result = await controller.active(task.id);

    expect(result).toEqual({ ...task, deleted_at: null });
    expect(tasksService.active).toHaveBeenCalledWith(task.id);
  });

  it('should softRemove task correctly', async () => {
    const now = new Date();
    const task = new TasksStub({ deleted_at: null });
    tasksService.softRemove.mockResolvedValue({
      ...task,
      deleted_at: now,
    });
    const result = await controller.softRemove(task.id);

    expect(result).toEqual({ ...task, deleted_at: now });
    expect(tasksService.softRemove).toHaveBeenCalledWith(task.id);
  });
});
