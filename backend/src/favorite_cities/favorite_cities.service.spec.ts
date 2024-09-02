import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteCitiesService } from './favorite_cities.service';

describe('FavoriteCitiesService', () => {
  let service: FavoriteCitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteCitiesService],
    }).compile();

    service = module.get<FavoriteCitiesService>(FavoriteCitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
