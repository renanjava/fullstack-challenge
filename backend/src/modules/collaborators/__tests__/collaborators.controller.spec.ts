import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorsController } from '../collaborators.controller';
import { CollaboratorsService } from '../collaborators.service';
import { CollaboratorsStub } from '../stubs/collaborators.stub';
import { mockCollaboratorsService } from '../mocks/collaborators-service.mock';
import { UpdateCollaboratorDto } from '../dtos/update-collaborator.dto';
import { CreateCollaboratorDto } from '../dtos/create-collaborator.dto';

describe('CollaboratorsController', () => {
  let controller: CollaboratorsController;
  const collaboratorsService = mockCollaboratorsService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratorsController],
      providers: [
        { provide: CollaboratorsService, useValue: collaboratorsService },
      ],
    }).compile();

    controller = module.get<CollaboratorsController>(CollaboratorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create collaborators correctly', async () => {
    const collaborator = new CollaboratorsStub();
    collaboratorsService.create.mockResolvedValue(collaborator);
    const result = await controller.create(
      collaborator as CreateCollaboratorDto,
    );

    expect(result).toEqual(collaborator);
    expect(collaboratorsService.create).toHaveBeenCalledWith(
      collaborator as CreateCollaboratorDto,
    );
  });

  it('should find all collaborators correctly', async () => {
    const collaboratorOne = new CollaboratorsStub();
    const collaboratorTwo = new CollaboratorsStub();
    collaboratorsService.findAll.mockResolvedValue([
      collaboratorOne,
      collaboratorTwo,
    ]);
    const result = await controller.findAll();

    expect(result).toEqual([collaboratorOne, collaboratorTwo]);
    expect(collaboratorsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one collaborator correctly', async () => {
    const collaborator = new CollaboratorsStub();
    collaboratorsService.findOne.mockResolvedValue(collaborator);
    const result = await controller.findOne(collaborator.id);

    expect(result).toEqual(collaborator);
    expect(collaboratorsService.findOne).toHaveBeenCalledWith(collaborator.id);
  });

  it('should update collaborator correctly', async () => {
    const collaborator = new CollaboratorsStub();
    const now = new Date();
    collaboratorsService.update.mockResolvedValue({
      ...collaborator,
      updated_at: now,
    });
    const result = await controller.update(collaborator.id, {
      updated_at: now,
    } as UpdateCollaboratorDto);

    expect(result).toEqual({ ...collaborator, updated_at: now });
    expect(collaboratorsService.update).toHaveBeenCalledWith(collaborator.id, {
      updated_at: now,
    });
  });

  it('should active collaborator correctly', async () => {
    const now = new Date();
    const collaborator = new CollaboratorsStub({ deleted_at: now });
    collaboratorsService.active.mockResolvedValue({
      ...collaborator,
      deleted_at: null,
    });
    const result = await controller.active(collaborator.id);

    expect(result).toEqual({ ...collaborator, deleted_at: null });
    expect(collaboratorsService.active).toHaveBeenCalledWith(collaborator.id);
  });

  it('should softRemove collaborator correctly', async () => {
    const now = new Date();
    const collaborator = new CollaboratorsStub({ deleted_at: null });
    collaboratorsService.softRemove.mockResolvedValue({
      ...collaborator,
      deleted_at: now,
    });
    const result = await controller.softRemove(collaborator.id);

    expect(result).toEqual({ ...collaborator, deleted_at: now });
    expect(collaboratorsService.softRemove).toHaveBeenCalledWith(
      collaborator.id,
    );
  });
});
