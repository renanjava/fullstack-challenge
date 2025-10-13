import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollaboratorsService } from './collaborators.service';
import { UpdateCollaboratorDto } from './dtos/update-collaborator.dto';
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto';
import {
  CreatedResponseDecorator,
  OkResponseDecorator,
  ValidationBadRequestResponseDecorator,
  NotFoundEntityResponseDecorator,
  ConflictResponseDecorator,
  UsuarioUnauthorizedResponseDecorator,
  collaboratorResponseExample,
} from '../../common/decorators/swagger-api.decorator';

@ApiTags('Collaborators')
@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  @CreatedResponseDecorator(
    'Colaborador criado com sucesso',
    collaboratorResponseExample,
  )
  @ValidationBadRequestResponseDecorator()
  @ConflictResponseDecorator('Nome do colaborador já existe')
  @UsuarioUnauthorizedResponseDecorator()
  async create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return await this.collaboratorsService.create(createCollaboratorDto);
  }

  @Get()
  @OkResponseDecorator('Lista de colaboradores retornada com sucesso', [
    collaboratorResponseExample,
  ])
  @UsuarioUnauthorizedResponseDecorator()
  async findAll() {
    return this.collaboratorsService.findAll();
  }

  @Get(':id')
  @OkResponseDecorator(
    'Colaborador encontrado com sucesso',
    collaboratorResponseExample,
  )
  @NotFoundEntityResponseDecorator('Colaborador', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async findOne(@Param('id') id: string) {
    return this.collaboratorsService.findOne(id);
  }

  @Patch(':id')
  @OkResponseDecorator(
    'Colaborador atualizado com sucesso',
    collaboratorResponseExample,
  )
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Colaborador', 'id')
  @ConflictResponseDecorator('Nome do colaborador já existe')
  @UsuarioUnauthorizedResponseDecorator()
  async update(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ) {
    return this.collaboratorsService.update(id, updateCollaboratorDto);
  }

  @Patch('active/:id')
  @OkResponseDecorator(
    'Colaborador reativado com sucesso',
    collaboratorResponseExample,
  )
  @NotFoundEntityResponseDecorator('Colaborador', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async active(@Param('id') id: string) {
    return await this.collaboratorsService.active(id);
  }

  @Delete(':id')
  @OkResponseDecorator('Colaborador removido com sucesso (soft delete)', {
    ...collaboratorResponseExample,
    deletedAt: '2025-01-01T00:00:00.000Z',
  })
  @NotFoundEntityResponseDecorator('Colaborador', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async softRemove(@Param('id') id: string) {
    return this.collaboratorsService.softRemove(id);
  }
}
