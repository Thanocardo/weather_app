import { Test, TestingModule } from '@nestjs/testing';
import { UsersDataService } from './users_data.service';

describe('UsersDataService', () => {
  let service: UsersDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDataService],
    }).compile();

    service = module.get<UsersDataService>(UsersDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
