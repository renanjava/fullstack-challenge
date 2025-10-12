import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetDateTimeTrackersDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
