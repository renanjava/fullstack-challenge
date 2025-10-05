import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsStub } from '../stubs/projects.stub';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { PrismaProjectsRepository } from '../repositories/prisma-projects.repository';
import { mockPrismaService } from '../../../prisma/mocks/prisma-service.mock';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProjectDto } from '../dtos/create-project.dto';

describe('ProjectsRepository', () => {
  let repository: PrismaProjectsRepository;
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
        PrismaProjectsRepository,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    repository = module.get<PrismaProjectsRepository>(PrismaProjectsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create projects correctly', async () => {
    const project = new ProjectsStub();
    prismaService.projects.create.mockResolvedValue(project);
    const result = await repository.create(project as CreateProjectDto);

    expect(result).toEqual(project);
    expect(prismaService.projects.create).toHaveBeenCalledWith({
      data: project as CreateProjectDto,
      omit: { deleted_at: true },
      include: { tasks: true },
    });
  });

  it('should find all projects correctly', async () => {
    const projectOne = new ProjectsStub();
    const projectTwo = new ProjectsStub();
    prismaService.projects.findMany.mockResolvedValue([projectOne, projectTwo]);
    const result = await repository.findAll();

    expect(result).toEqual([projectOne, projectTwo]);
    expect(prismaService.projects.findMany).toHaveBeenCalledTimes(1);
  });

  it('should find one project correctly', async () => {
    const project = new ProjectsStub();
    prismaService.projects.findUniqueOrThrow.mockResolvedValue(project);
    const result = await repository.findOne(project.id);

    expect(result).toEqual(project);
    expect(prismaService.projects.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: project.id, deleted_at: null },
      omit: { deleted_at: true },
      include: { tasks: true },
    });
  });

  it('should update project correctly', async () => {
    const project = new ProjectsStub();
    const now = new Date();
    prismaService.projects.update.mockResolvedValue({
      ...project,
      updated_at: now,
    });
    const result = await repository.update(project.id, {
      updated_at: now,
    } as UpdateProjectDto);

    expect(result).toEqual({ ...project, updated_at: now });
    expect(prismaService.projects.update).toHaveBeenCalledWith({
      where: { id: project.id },
      include: { tasks: true },
      data: {
        updated_at: now,
      },
    });
  });

  it('should active project correctly', async () => {
    const now = new Date();
    const project = new ProjectsStub({ deleted_at: now });
    prismaService.projects.update.mockResolvedValue({
      ...project,
      deleted_at: null,
    });
    const result = await repository.update(project.id, {
      deleted_at: null,
    } as UpdateProjectDto);

    expect(result).toEqual({ ...project, deleted_at: null });
    expect(prismaService.projects.update).toHaveBeenCalledWith({
      where: { id: project.id },
      include: { tasks: true },
      data: {
        deleted_at: null,
      },
    });
  });

  it('should softRemove project correctly', async () => {
    const now = new Date();
    const project = new ProjectsStub({ deleted_at: null });
    prismaService.projects.update.mockResolvedValue({
      ...project,
      deleted_at: now,
    });
    const result = await repository.update(project.id, {
      deleted_at: null,
    } as UpdateProjectDto);

    expect(result).toEqual({ ...project, deleted_at: now });
    expect(prismaService.projects.update).toHaveBeenCalledWith({
      where: { id: project.id },
      include: { tasks: true },
      data: {
        deleted_at: null,
      },
    });
  });
});
