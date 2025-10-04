import { OmitType } from '@nestjs/mapped-types';
import { CollaboratorsEntity } from '../entities/collaborator.entity';

export class ResponseCollaboratorDto extends OmitType(CollaboratorsEntity, [
  'deleted_at',
] as const) {}
