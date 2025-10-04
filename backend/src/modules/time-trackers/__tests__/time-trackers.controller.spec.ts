import { Test, TestingModule } from '@nestjs/testing';
import { TimeTrackersController } from '../time-trackers.controller';
import { TimeTrackersService } from '../time-trackers.service';

describe('TimeTrackersController', () => {
  let controller: TimeTrackersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeTrackersController],
      providers: [TimeTrackersService],
    }).compile();

    controller = module.get<TimeTrackersController>(TimeTrackersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
