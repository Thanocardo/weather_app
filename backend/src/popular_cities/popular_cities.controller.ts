import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PopularCitiesService } from './popular_cities.service';
import { PopularCityDto } from './dto/popular_city.dto';

@Controller('popular-cities')
export class PopularCitiesController {
  constructor(private readonly popularCitiesService: PopularCitiesService) {}
  
  @Get()
  findAll() {
    return this.popularCitiesService.findAllPopularCities();
  }

  @Patch('increase/')
  increaseSearchCount(@Body() cityData: PopularCityDto[]) {
    return this.popularCitiesService.increaseSearchCount(cityData)
  }

}
