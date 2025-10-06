import { PrismaCollaboratorsRepository } from './repositories/prisma-collaborators.repository';
import { Injectable } from '@nestjs/common';
import { UpdateCollaboratorDto } from './dtos/update-collaborator.dto';
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly collaboratorsRepository: PrismaCollaboratorsRepository,
  ) {}
  async create(createCollaboratorDto: CreateCollaboratorDto) {
    return await this.collaboratorsRepository.create(createCollaboratorDto);
  }

  async findAll() {
    return await this.collaboratorsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.collaboratorsRepository.findOne(id);
  }

  async update(id: string, updateCollaboratorDto: UpdateCollaboratorDto) {
    return await this.collaboratorsRepository.update(id, updateCollaboratorDto);
  }

  async active(id: string) {
    return await this.collaboratorsRepository.update(id, {
      deleted_at: null,
    } as UpdateCollaboratorDto);
  }

  async softRemove(id: string) {
    return await this.collaboratorsRepository.update(id, {
      deleted_at: new Date(),
    } as UpdateCollaboratorDto);
  }
}
