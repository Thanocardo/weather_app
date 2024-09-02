import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteCitiesController } from './favorite_cities.controller';
import { FavoriteCitiesService } from './favorite_cities.service';

describe('FavoriteCitiesController', () => {
  let controller: FavoriteCitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteCitiesController],
      providers: [FavoriteCitiesService],
    }).compile();

    controller = module.get<FavoriteCitiesController>(FavoriteCitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
