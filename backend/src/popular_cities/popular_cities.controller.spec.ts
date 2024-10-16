import { Test, TestingModule } from '@nestjs/testing';
import { PopularCitiesController } from './popular_cities.controller';
import { PopularCitiesService } from './popular_cities.service';

describe('PopularCitiesController', () => {
  let controller: PopularCitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopularCitiesController],
      providers: [PopularCitiesService],
    }).compile();

    controller = module.get<PopularCitiesController>(PopularCitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
