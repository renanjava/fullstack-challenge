import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { UpdateCollaboratorDto } from './dtos/update-collaborator.dto';
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  async create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return await this.collaboratorsService.create(createCollaboratorDto);
  }
  @Get()
  async findAll() {
    return this.collaboratorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.collaboratorsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ) {
    return this.collaboratorsService.update(id, updateCollaboratorDto);
  }

  @Patch('active/:id')
  async active(@Param('id') id: string) {
    return await this.collaboratorsService.active(id);
  }

  @Delete(':id')
  async softRemove(@Param('id') id: string) {
    return this.collaboratorsService.softRemove(id);
  }
}
