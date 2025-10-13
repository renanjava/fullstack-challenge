import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import {
  CreatedResponseDecorator,
  OkResponseDecorator,
  ValidationBadRequestResponseDecorator,
  NotFoundEntityResponseDecorator,
  ConflictResponseDecorator,
  UsuarioUnauthorizedResponseDecorator,
  projectResponseExample,
} from '../../common/decorators/swagger-api.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @CreatedResponseDecorator(
    'Projeto criado com sucesso',
    projectResponseExample,
  )
  @ValidationBadRequestResponseDecorator()
  @ConflictResponseDecorator('Nome do projeto já existe')
  @UsuarioUnauthorizedResponseDecorator()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Get()
  @OkResponseDecorator('Lista de projetos retornada com sucesso', [
    projectResponseExample,
  ])
  @UsuarioUnauthorizedResponseDecorator()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  @OkResponseDecorator('Projeto encontrado com sucesso', projectResponseExample)
  @NotFoundEntityResponseDecorator('Projeto', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  @Patch(':id')
  @OkResponseDecorator('Projeto atualizado com sucesso', projectResponseExample)
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Projeto', 'id')
  @ConflictResponseDecorator('Nome do projeto já existe')
  @UsuarioUnauthorizedResponseDecorator()
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(id, updateProjectDto);
  }

  @Patch('active/:id')
  @OkResponseDecorator('Projeto reativado com sucesso', projectResponseExample)
  @NotFoundEntityResponseDecorator('Projeto', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async active(@Param('id') id: string) {
    return await this.projectsService.active(id);
  }

  @Delete(':id')
  @OkResponseDecorator('Projeto removido com sucesso (soft delete)', {
    ...projectResponseExample,
    deletedAt: '2025-01-01T00:00:00.000Z',
  })
  @NotFoundEntityResponseDecorator('Projeto', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async softRemove(@Param('id') id: string) {
    return await this.projectsService.softRemove(id);
  }
}
