import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetDateTimeTrackersDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
