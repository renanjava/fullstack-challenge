import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollaboratorDto {
  @ApiProperty({
    description: 'Nome do colaborador',
    example: 'Maria Silva',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID do usuário associado ao colaborador',
    example: 'user-123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
