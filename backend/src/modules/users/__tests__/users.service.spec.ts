import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersStub } from '../stubs/users.stub';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { mockUsersRepository } from '../mocks/users-repository.mock';
import { PrismaUsersRepository } from '../repositories/prisma-users.repository';
import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';

describe('UsersService', () => {
  let service: UsersService;
  const usersRepository = mockUsersRepository();

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
        UsersService,
        { provide: PrismaUsersRepository, useValue: usersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create users correctly', async () => {
    const user = new UsersStub();
    usersRepository.create.mockResolvedValue(user);
    const result = await service.create(user as UserRegisterDto);

    expect(result).toEqual(user);
    expect(usersRepository.create).toHaveBeenCalledWith(
      user as UserRegisterDto,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users correctly', async () => {
    const userOne = new UsersStub();
    const userTwo = new UsersStub();
    usersRepository.findAll.mockResolvedValue([userOne, userTwo]);
    const result = await service.findAll();

    expect(result).toEqual([userOne, userTwo]);
    expect(usersRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one user correctly', async () => {
    const user = new UsersStub();
    usersRepository.findOne.mockResolvedValue(user);
    const result = await service.findOne(user.id);

    expect(result).toEqual(user);
    expect(usersRepository.findOne).toHaveBeenCalledWith(user.id);
  });

  it('should update user correctly', async () => {
    const user = new UsersStub();
    const now = new Date();
    usersRepository.update.mockResolvedValue({ ...user, updated_at: now });
    const result = await service.update(user.id, {
      updated_at: now,
    } as UpdateUserDto);

    expect(result).toEqual({ ...user, updated_at: now });
    expect(usersRepository.update).toHaveBeenCalledWith(user.id, {
      updated_at: now,
    });
  });

  it('should active user correctly', async () => {
    const now = new Date();
    const user = new UsersStub({ deleted_at: now });
    usersRepository.update.mockResolvedValue({ ...user, deleted_at: null });
    const result = await service.active(user.id);

    expect(result).toEqual({ ...user, deleted_at: null });
    expect(usersRepository.update).toHaveBeenCalledWith(user.id, {
      deleted_at: null,
    });
  });

  it('should softRemove user correctly', async () => {
    const now = new Date();
    const user = new UsersStub({ deleted_at: null });
    usersRepository.update.mockResolvedValue({
      ...user,
      deleted_at: now,
    });
    const result = await service.softRemove(user.id);

    expect(result).toEqual({ ...user, deleted_at: now });
    expect(usersRepository.update).toHaveBeenCalledWith(user.id, {
      deleted_at: now,
    });
  });
});
