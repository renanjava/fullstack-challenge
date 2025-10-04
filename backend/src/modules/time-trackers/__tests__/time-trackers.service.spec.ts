import { Test, TestingModule } from '@nestjs/testing';
import { TimeTrackersService } from '../time-trackers.service';

describe('TimeTrackersService', () => {
  let service: TimeTrackersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeTrackersService],
    }).compile();

    service = module.get<TimeTrackersService>(TimeTrackersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
