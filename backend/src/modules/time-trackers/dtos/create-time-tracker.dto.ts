import { Exclude, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTimeTrackerDto {
  @ApiProperty({
    description: 'Data e hora de início do rastreamento',
    example: '2025-01-15T08:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    description: 'Data e hora de fim do rastreamento',
    example: '2025-01-15T17:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  end_date: Date;

  @ApiPropertyOptional({
    description: 'ID da TimeZone',
    example: 'America/Sao_Paulo',
    type: String,
  })
  @Exclude()
  timezone_id: string;

  @ApiPropertyOptional({
    description: 'ID do colaborador (opcional)',
    example: 'collab-123',
    type: String,
  })
  @IsOptional()
  collaborator_id?: string;

  @ApiProperty({
    description: 'ID da tarefa associada',
    example: 'task-123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  task_id: string;
}
