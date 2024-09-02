import { Test, TestingModule } from '@nestjs/testing';
import { UsersDataController } from './users_data.controller';
import { UsersDataService } from './users_data.service';

describe('UsersDataController', () => {
  let controller: UsersDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDataController],
      providers: [UsersDataService],
    }).compile();

    controller = module.get<UsersDataController>(UsersDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
