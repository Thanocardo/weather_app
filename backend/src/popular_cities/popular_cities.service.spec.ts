import { Test, TestingModule } from '@nestjs/testing';
import { PopularCitiesService } from './popular_cities.service';

describe('PopularCitiesService', () => {
  let service: PopularCitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularCitiesService],
    }).compile();

    service = module.get<PopularCitiesService>(PopularCitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
