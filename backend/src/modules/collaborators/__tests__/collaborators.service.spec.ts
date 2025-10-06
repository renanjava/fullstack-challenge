import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorsService } from '../collaborators.service';
import { CollaboratorsStub } from '../stubs/collaborators.stub';
import { UpdateCollaboratorDto } from '../dtos/update-collaborator.dto';
import { mockCollaboratorsRepository } from '../mocks/collaborators-repository.mock';
import { PrismaCollaboratorsRepository } from '../repositories/prisma-collaborators.repository';
import { CreateCollaboratorDto } from '../dtos/create-collaborator.dto';

describe('CollaboratorsService', () => {
  let service: CollaboratorsService;
  const collaboratorsRepository = mockCollaboratorsRepository();

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
        CollaboratorsService,
        {
          provide: PrismaCollaboratorsRepository,
          useValue: collaboratorsRepository,
        },
      ],
    }).compile();

    service = module.get<CollaboratorsService>(CollaboratorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create collaborators correctly', async () => {
    const collaborator = new CollaboratorsStub();
    collaboratorsRepository.create.mockResolvedValue(collaborator);
    const result = await service.create(collaborator as CreateCollaboratorDto);

    expect(result).toEqual(collaborator);
    expect(collaboratorsRepository.create).toHaveBeenCalledWith(
      collaborator as CreateCollaboratorDto,
    );
  });

  it('should find all collaborators correctly', async () => {
    const collaboratorOne = new CollaboratorsStub();
    const collaboratorTwo = new CollaboratorsStub();
    collaboratorsRepository.findAll.mockResolvedValue([
      collaboratorOne,
      collaboratorTwo,
    ]);
    const result = await service.findAll();

    expect(result).toEqual([collaboratorOne, collaboratorTwo]);
    expect(collaboratorsRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one collaborator correctly', async () => {
    const collaborator = new CollaboratorsStub();
    collaboratorsRepository.findOne.mockResolvedValue(collaborator);
    const result = await service.findOne(collaborator.id);

    expect(result).toEqual(collaborator);
    expect(collaboratorsRepository.findOne).toHaveBeenCalledWith(
      collaborator.id,
    );
  });

  it('should update collaborator correctly', async () => {
    const collaborator = new CollaboratorsStub();
    const now = new Date();
    collaboratorsRepository.update.mockResolvedValue({
      ...collaborator,
      updated_at: now,
    });
    const result = await service.update(collaborator.id, {
      updated_at: now,
    } as UpdateCollaboratorDto);

    expect(result).toEqual({ ...collaborator, updated_at: now });
    expect(collaboratorsRepository.update).toHaveBeenCalledWith(
      collaborator.id,
      {
        updated_at: now,
      },
    );
  });

  it('should active collaborator correctly', async () => {
    const now = new Date();
    const collaborator = new CollaboratorsStub({ deleted_at: now });
    collaboratorsRepository.update.mockResolvedValue({
      ...collaborator,
      deleted_at: null,
    });
    const result = await service.active(collaborator.id);

    expect(result).toEqual({ ...collaborator, deleted_at: null });
    expect(collaboratorsRepository.update).toHaveBeenCalledWith(
      collaborator.id,
      {
        deleted_at: null,
      },
    );
  });

  it('should softRemove collaborator correctly', async () => {
    const now = new Date();
    const collaborator = new CollaboratorsStub({ deleted_at: null });
    collaboratorsRepository.update.mockResolvedValue({
      ...collaborator,
      deleted_at: now,
    });
    const result = await service.softRemove(collaborator.id);

    expect(result).toEqual({ ...collaborator, deleted_at: now });
    expect(collaboratorsRepository.update).toHaveBeenCalledWith(
      collaborator.id,
      {
        deleted_at: now,
      },
    );
  });
});
