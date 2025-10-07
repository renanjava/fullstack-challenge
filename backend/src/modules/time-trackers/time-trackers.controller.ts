import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeTrackersService } from './time-trackers.service';
import { CreateTimeTrackerDto } from './dtos/create-time-tracker.dto';
import { UpdateTimeTrackerDto } from './dtos/update-time-tracker.dto';
import { GetDateTimeTrackersDto } from './dtos/get-date-time-trackers.dto';

@Controller('time-trackers')
export class TimeTrackersController {
  constructor(private readonly timeTrackersService: TimeTrackersService) {}

  @Post()
  async create(@Body() createTimeTrackerDto: CreateTimeTrackerDto) {
    return this.timeTrackersService.create(createTimeTrackerDto);
  }

  @Get()
  async findAll() {
    return this.timeTrackersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.timeTrackersService.findOne(id);
  }

  @Get('day/:date')
  async getTimeTrackersFromDay(
    @Param() getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return this.timeTrackersService.getTimeTrackersFromDay(
      getDateTimeTrackersDto.date,
    );
  }

  @Get('month/:date')
  async getTimeTrackersFromMonth(
    @Param() getDateTimeTrackersDto: GetDateTimeTrackersDto,
  ) {
    return this.timeTrackersService.getTimeTrackersFromMonth(
      getDateTimeTrackersDto.date,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimeTrackerDto: UpdateTimeTrackerDto,
  ) {
    return this.timeTrackersService.update(id, updateTimeTrackerDto);
  }

  @Patch('active/:id')
  async active(@Param('id') id: string) {
    return this.timeTrackersService.active(id);
  }

  @Delete(':id')
  async softRemove(@Param('id') id: string) {
    return this.timeTrackersService.softRemove(id);
  }
}
