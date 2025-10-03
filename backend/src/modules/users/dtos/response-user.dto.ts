import { OmitType } from '@nestjs/mapped-types';
import { UsersEntity } from '../entities/users.entity';

export class ResponseUserDto extends OmitType(UsersEntity, [
  'password',
  'deleted_at',
] as const) {}
