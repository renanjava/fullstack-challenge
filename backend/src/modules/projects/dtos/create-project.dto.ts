import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Nome do projeto',
    example: 'Projeto XPTO',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
