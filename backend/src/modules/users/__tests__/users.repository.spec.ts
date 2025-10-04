import { Test, TestingModule } from '@nestjs/testing';
import { UsersStub } from '../stubs/users.stub';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PrismaUsersRepository } from '../repositories/prisma-users.repository';
import { mockPrismaService } from '../../../prisma/mocks/prisma-service.mock';
import { PrismaService } from '../../../prisma/prisma.service';

describe('UsersRepository', () => {
  let repository: PrismaUsersRepository;
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
        PrismaUsersRepository,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    repository = module.get<PrismaUsersRepository>(PrismaUsersRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should find all users correctly', async () => {
    const userOne = new UsersStub();
    const userTwo = new UsersStub();
    prismaService.users.findMany.mockResolvedValue([userOne, userTwo]);
    const result = await repository.findAll();

    expect(result).toEqual([userOne, userTwo]);
    expect(prismaService.users.findMany).toHaveBeenCalledTimes(1);
  });

  it('should find one user correctly', async () => {
    const user = new UsersStub();
    prismaService.users.findUniqueOrThrow.mockResolvedValue(user);
    const result = await repository.findOne(user.id);

    expect(result).toEqual(user);
    expect(prismaService.users.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: user.id, deleted_at: null },
      omit: { password: true, deleted_at: true },
      include: { collaborator: true },
    });
  });

  it('should update user correctly', async () => {
    const user = new UsersStub();
    const now = new Date();
    prismaService.users.update.mockResolvedValue({
      ...user,
      updated_at: now,
    });
    const result = await repository.update(user.id, {
      updated_at: now,
    } as UpdateUserDto);

    expect(result).toEqual({ ...user, updated_at: now });
    expect(prismaService.users.update).toHaveBeenCalledWith({
      where: { id: user.id },
      omit: { password: true },
      include: { collaborator: true },
      data: {
        updated_at: now,
      },
    });
  });

  it('should active user correctly', async () => {
    const now = new Date();
    const user = new UsersStub({ deleted_at: now });
    prismaService.users.update.mockResolvedValue({ ...user, deleted_at: null });
    const result = await repository.update(user.id, {
      deleted_at: null,
    } as UpdateUserDto);

    expect(result).toEqual({ ...user, deleted_at: null });
    expect(prismaService.users.update).toHaveBeenCalledWith({
      where: { id: user.id },
      omit: { password: true },
      include: { collaborator: true },
      data: {
        deleted_at: null,
      },
    });
  });

  it('should softRemove user correctly', async () => {
    const now = new Date();
    const user = new UsersStub({ deleted_at: null });
    prismaService.users.update.mockResolvedValue({
      ...user,
      deleted_at: now,
    });
    const result = await repository.update(user.id, {
      deleted_at: null,
    } as UpdateUserDto);

    expect(result).toEqual({ ...user, deleted_at: now });
    expect(prismaService.users.update).toHaveBeenCalledWith({
      where: { id: user.id },
      omit: { password: true },
      include: { collaborator: true },
      data: {
        deleted_at: null,
      },
    });
  });
});
