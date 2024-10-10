import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards, Req } from '@nestjs/common';
import { FavoriteCitiesService } from './favorite_cities.service';
import { AuthGuard } from 'src/users_data/auth/auth.guard';
import { CreateFavoriteCityDto } from './dto/create-favorite_city.dto';

@Controller('fav-cities')
export class FavoriteCitiesController {
  constructor(private readonly favoriteCitiesService: FavoriteCitiesService) {}

  @UseGuards(AuthGuard)
  @Post('add/')
  async create(@Param() params: any, @Body() cityData: CreateFavoriteCityDto) {
    return this.favoriteCitiesService.create(params.user, cityData)
  }

  @UseGuards(AuthGuard)
  @Get('user/')
  findAllByUserId(@Param() params: any) {
    return this.favoriteCitiesService.findAllFavoriteCitiesByUserToken(params.user);
  }

  @UseGuards(AuthGuard)
  @Patch('remove/:city_id')
  async removeFavoriteCityUser(@Param() params: any) {
    return this.favoriteCitiesService.removeFavoriteCity(params.user, params.city_id);
  }

}
