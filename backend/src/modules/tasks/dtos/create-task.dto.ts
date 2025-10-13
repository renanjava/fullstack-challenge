import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Nome da tarefa',
    example: 'Implementar autenticação',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Criar sistema de login com JWT',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'ID do projeto ao qual a tarefa pertence',
    example: 'proj-123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  project_id: string;
}
