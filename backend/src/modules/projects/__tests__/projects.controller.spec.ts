import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../projects.controller';
import { ProjectsService } from '../projects.service';
import { ProjectsStub } from '../stubs/projects.stub';
import { mockProjectsService } from '../mocks/projects-service.mock';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { CreateProjectDto } from '../dtos/create-project.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  const projectsService = mockProjectsService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: projectsService }],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create projects correctly', async () => {
    const project = new ProjectsStub();
    projectsService.create.mockResolvedValue(project);
    const result = await controller.create(project as CreateProjectDto);

    expect(result).toEqual(project);
    expect(projectsService.create).toHaveBeenCalledWith(
      project as CreateProjectDto,
    );
  });

  it('should find all projects correctly', async () => {
    const projectOne = new ProjectsStub();
    const projectTwo = new ProjectsStub();
    projectsService.findAll.mockResolvedValue([projectOne, projectTwo]);
    const result = await controller.findAll();

    expect(result).toEqual([projectOne, projectTwo]);
    expect(projectsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one project correctly', async () => {
    const project = new ProjectsStub();
    projectsService.findOne.mockResolvedValue(project);
    const result = await controller.findOne(project.id);

    expect(result).toEqual(project);
    expect(projectsService.findOne).toHaveBeenCalledWith(project.id);
  });

  it('should update project correctly', async () => {
    const project = new ProjectsStub();
    const now = new Date();
    projectsService.update.mockResolvedValue({
      ...project,
      updated_at: now,
    });
    const result = await controller.update(project.id, {
      updated_at: now,
    } as UpdateProjectDto);

    expect(result).toEqual({ ...project, updated_at: now });
    expect(projectsService.update).toHaveBeenCalledWith(project.id, {
      updated_at: now,
    });
  });

  it('should active project correctly', async () => {
    const now = new Date();
    const project = new ProjectsStub({ deleted_at: now });
    projectsService.active.mockResolvedValue({
      ...project,
      deleted_at: null,
    });
    const result = await controller.active(project.id);

    expect(result).toEqual({ ...project, deleted_at: null });
    expect(projectsService.active).toHaveBeenCalledWith(project.id);
  });

  it('should softRemove project correctly', async () => {
    const now = new Date();
    const project = new ProjectsStub({ deleted_at: null });
    projectsService.softRemove.mockResolvedValue({
      ...project,
      deleted_at: now,
    });
    const result = await controller.softRemove(project.id);

    expect(result).toEqual({ ...project, deleted_at: now });
    expect(projectsService.softRemove).toHaveBeenCalledWith(project.id);
  });
});
