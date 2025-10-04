import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTimeTrackerDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  timezone_id: string;

  @IsOptional()
  collaborator_id?: string;

  @IsString()
  @IsNotEmpty()
  task_id: string;
}
