import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersStub } from '../stubs/users.stub';
import { mockUsersService } from '../mocks/users-service.mock';
import { UpdateUserDto } from '../dtos/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  const usersService = mockUsersService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users correctly', async () => {
    const userOne = new UsersStub();
    const userTwo = new UsersStub();
    usersService.findAll.mockResolvedValue([userOne, userTwo]);
    const result = await controller.findAll();

    expect(result).toEqual([userOne, userTwo]);
    expect(usersService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one user correctly', async () => {
    const user = new UsersStub();
    usersService.findOne.mockResolvedValue(user);
    const result = await controller.findOne(user.id);

    expect(result).toEqual(user);
    expect(usersService.findOne).toHaveBeenCalledWith(user.id);
  });

  it('should update user correctly', async () => {
    const user = new UsersStub();
    const now = new Date();
    usersService.update.mockResolvedValue({ ...user, updated_at: now });
    const result = await controller.update(user.id, {
      updated_at: now,
    } as UpdateUserDto);

    expect(result).toEqual({ ...user, updated_at: now });
    expect(usersService.update).toHaveBeenCalledWith(user.id, {
      updated_at: now,
    });
  });

  it('should active user correctly', async () => {
    const now = new Date();
    const user = new UsersStub({ deleted_at: now });
    usersService.active.mockResolvedValue({ ...user, deleted_at: null });
    const result = await controller.active(user.id);

    expect(result).toEqual({ ...user, deleted_at: null });
    expect(usersService.active).toHaveBeenCalledWith(user.id);
  });

  it('should softRemove user correctly', async () => {
    const now = new Date();
    const user = new UsersStub({ deleted_at: null });
    usersService.softRemove.mockResolvedValue({
      ...user,
      deleted_at: now,
    });
    const result = await controller.softRemove(user.id);

    expect(result).toEqual({ ...user, deleted_at: now });
    expect(usersService.softRemove).toHaveBeenCalledWith(user.id);
  });
});
