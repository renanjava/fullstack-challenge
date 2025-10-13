import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetDateTimeTrackersDto {
  @ApiPropertyOptional({
    description: 'ID do colaborador ou projeto',
    example: 'collab-123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'Data no formato ISO (YYYY-MM-DD ou YYYY-MM-DD HH:mm:ss)',
    example: '2025-01-15',
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
