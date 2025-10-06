import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorsStub } from '../stubs/collaborators.stub';
import { UpdateCollaboratorDto } from '../dtos/update-collaborator.dto';
import { PrismaCollaboratorsRepository } from '../repositories/prisma-collaborators.repository';
import { mockPrismaService } from '../../../prisma/mocks/prisma-service.mock';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCollaboratorDto } from '../dtos/create-collaborator.dto';

describe('CollaboratorsRepository', () => {
  let repository: PrismaCollaboratorsRepository;
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
        PrismaCollaboratorsRepository,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    repository = module.get<PrismaCollaboratorsRepository>(
      PrismaCollaboratorsRepository,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create collaborators correctly', async () => {
    const collaborator = new CollaboratorsStub();
    prismaService.collaborators.create.mockResolvedValue(collaborator);
    const result = await repository.create(
      collaborator as CreateCollaboratorDto,
    );

    expect(result).toEqual(collaborator);
    expect(prismaService.collaborators.create).toHaveBeenCalledWith({
      data: collaborator as CreateCollaboratorDto,
      omit: { deleted_at: true },
      include: { user: true },
    });
  });

  it('should find all collaborators correctly', async () => {
    const collaboratorOne = new CollaboratorsStub();
    const collaboratorTwo = new CollaboratorsStub();
    prismaService.collaborators.findMany.mockResolvedValue([
      collaboratorOne,
      collaboratorTwo,
    ]);
    const result = await repository.findAll();

    expect(result).toEqual([collaboratorOne, collaboratorTwo]);
    expect(prismaService.collaborators.findMany).toHaveBeenCalledTimes(1);
  });

  it('should find one collaborator correctly', async () => {
    const collaborator = new CollaboratorsStub();
    prismaService.collaborators.findUniqueOrThrow.mockResolvedValue(
      collaborator,
    );
    const result = await repository.findOne(collaborator.id);

    expect(result).toEqual(collaborator);
    expect(prismaService.collaborators.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: collaborator.id, deleted_at: null },
      omit: { deleted_at: true },
      include: { user: true },
    });
  });

  it('should update collaborator correctly', async () => {
    const collaborator = new CollaboratorsStub();
    const now = new Date();
    prismaService.collaborators.update.mockResolvedValue({
      ...collaborator,
      updated_at: now,
    });
    const result = await repository.update(collaborator.id, {
      updated_at: now,
    } as UpdateCollaboratorDto);

    expect(result).toEqual({ ...collaborator, updated_at: now });
    expect(prismaService.collaborators.update).toHaveBeenCalledWith({
      where: { id: collaborator.id },
      include: { user: true },
      data: {
        updated_at: now,
      },
    });
  });

  it('should active collaborator correctly', async () => {
    const now = new Date();
    const collaborator = new CollaboratorsStub({ deleted_at: now });
    prismaService.collaborators.update.mockResolvedValue({
      ...collaborator,
      deleted_at: null,
    });
    const result = await repository.update(collaborator.id, {
      deleted_at: null,
    } as UpdateCollaboratorDto);

    expect(result).toEqual({ ...collaborator, deleted_at: null });
    expect(prismaService.collaborators.update).toHaveBeenCalledWith({
      where: { id: collaborator.id },
      include: { user: true },
      data: {
        deleted_at: null,
      },
    });
  });

  it('should softRemove collaborator correctly', async () => {
    const now = new Date();
    const collaborator = new CollaboratorsStub({ deleted_at: null });
    prismaService.collaborators.update.mockResolvedValue({
      ...collaborator,
      deleted_at: now,
    });
    const result = await repository.update(collaborator.id, {
      deleted_at: null,
    } as UpdateCollaboratorDto);

    expect(result).toEqual({ ...collaborator, deleted_at: now });
    expect(prismaService.collaborators.update).toHaveBeenCalledWith({
      where: { id: collaborator.id },
      include: { user: true },
      data: {
        deleted_at: null,
      },
    });
  });
});
