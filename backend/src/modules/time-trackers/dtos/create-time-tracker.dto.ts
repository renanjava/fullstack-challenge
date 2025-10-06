import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTimeTrackerDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
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
