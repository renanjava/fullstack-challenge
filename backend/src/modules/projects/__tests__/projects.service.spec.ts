import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../projects.service';
import { ProjectsStub } from '../stubs/projects.stub';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { mockProjectsRepository } from '../mocks/projects-repository.mock';
import { PrismaProjectsRepository } from '../repositories/prisma-projects.repository';
import { CreateProjectDto } from '../dtos/create-project.dto';

describe('ProjectsService', () => {
  let service: ProjectsService;
  const projectsRepository = mockProjectsRepository();

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
        ProjectsService,
        {
          provide: PrismaProjectsRepository,
          useValue: projectsRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create projects correctly', async () => {
    const project = new ProjectsStub();
    projectsRepository.create.mockResolvedValue(project);
    const result = await service.create(project as CreateProjectDto);

    expect(result).toEqual(project);
    expect(projectsRepository.create).toHaveBeenCalledWith(
      project as CreateProjectDto,
    );
  });

  it('should find all projects correctly', async () => {
    const projectOne = new ProjectsStub();
    const projectTwo = new ProjectsStub();
    projectsRepository.findAll.mockResolvedValue([projectOne, projectTwo]);
    const result = await service.findAll();

    expect(result).toEqual([projectOne, projectTwo]);
    expect(projectsRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one project correctly', async () => {
    const project = new ProjectsStub();
    projectsRepository.findOne.mockResolvedValue(project);
    const result = await service.findOne(project.id);

    expect(result).toEqual(project);
    expect(projectsRepository.findOne).toHaveBeenCalledWith(project.id);
  });

  it('should update project correctly', async () => {
    const project = new ProjectsStub();
    const now = new Date();
    projectsRepository.update.mockResolvedValue({
      ...project,
      updated_at: now,
    });
    const result = await service.update(project.id, {
      updated_at: now,
    } as UpdateProjectDto);

    expect(result).toEqual({ ...project, updated_at: now });
    expect(projectsRepository.update).toHaveBeenCalledWith(project.id, {
      updated_at: now,
    });
  });

  it('should active project correctly', async () => {
    const now = new Date();
    const project = new ProjectsStub({ deleted_at: now });
    projectsRepository.update.mockResolvedValue({
      ...project,
      deleted_at: null,
    });
    const result = await service.active(project.id);

    expect(result).toEqual({ ...project, deleted_at: null });
    expect(projectsRepository.update).toHaveBeenCalledWith(project.id, {
      deleted_at: null,
    });
  });

  it('should softRemove project correctly', async () => {
    const now = new Date();
    const project = new ProjectsStub({ deleted_at: null });
    projectsRepository.update.mockResolvedValue({
      ...project,
      deleted_at: now,
    });
    const result = await service.softRemove(project.id);

    expect(result).toEqual({ ...project, deleted_at: now });
    expect(projectsRepository.update).toHaveBeenCalledWith(project.id, {
      deleted_at: now,
    });
  });
});
