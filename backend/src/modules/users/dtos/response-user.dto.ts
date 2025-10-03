import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;

  @Exclude()
  password: string;

  created_at: Date;
  updated_at: Date;

  @Exclude()
  deleted_at: Date | null;
}
