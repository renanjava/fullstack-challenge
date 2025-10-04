import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
