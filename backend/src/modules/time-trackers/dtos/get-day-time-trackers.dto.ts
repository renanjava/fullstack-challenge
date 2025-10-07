import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetDayTimeTrackersDto {
  @IsDateString()
  @IsNotEmpty()
  day: string;
}
