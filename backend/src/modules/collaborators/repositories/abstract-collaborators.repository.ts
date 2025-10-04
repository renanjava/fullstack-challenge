import { UpdateCollaboratorDto } from '../dtos/update-collaborator.dto';
import { ResponseCollaboratorDto } from '../dtos/response-collaborator.dto';

export abstract class CollaboratorsRepository {
  abstract findAll(): Promise<ResponseCollaboratorDto[]>;
  abstract findOne(id: string): Promise<ResponseCollaboratorDto>;
  abstract update(
    id: string,
    updateCollaboratorsDto: UpdateCollaboratorDto,
  ): Promise<ResponseCollaboratorDto>;
}
