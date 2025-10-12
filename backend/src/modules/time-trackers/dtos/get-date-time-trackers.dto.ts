import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class GetDateTimeTrackersDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
