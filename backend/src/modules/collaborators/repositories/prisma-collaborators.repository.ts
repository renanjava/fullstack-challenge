import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateCollaboratorDto } from '../dtos/update-collaborator.dto';
import { CollaboratorsRepository } from './abstract-collaborators.repository';
import { ResponseCollaboratorDto } from '../dtos/response-collaborator.dto';
import { CreateCollaboratorDto } from '../dtos/create-collaborator.dto';

@Injectable()
export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<ResponseCollaboratorDto> {
    return await this.prismaClient.collaborators.create({
      data: createCollaboratorDto,
      omit: { deleted_at: true },
      include: { user: true },
    });
  }

  async findAll(): Promise<ResponseCollaboratorDto[]> {
    return await this.prismaClient.collaborators.findMany({
      where: { deleted_at: null },
      omit: { deleted_at: true },
      include: { user: true },
    });
  }
  async findOne(id: string): Promise<ResponseCollaboratorDto> {
    return await this.prismaClient.collaborators.findUniqueOrThrow({
      where: { id, deleted_at: null },
      omit: { deleted_at: true },
      include: { user: true },
    });
  }
  async update(
    id: string,
    updateCollaboratorDto: UpdateCollaboratorDto,
  ): Promise<ResponseCollaboratorDto> {
    return await this.prismaClient.collaborators.update({
      where: { id },
      include: { user: true },
      data: updateCollaboratorDto,
    });
  }
}
