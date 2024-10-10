import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards, Req } from '@nestjs/common';
import { FavoriteCitiesService } from './favorite_cities.service';
import { AuthGuard, GetUser } from 'src/users_data/auth/auth.guard';
import { CreateFavoriteCityDto } from './dto/create-favorite_city.dto';

@Controller('fav-cities')
export class FavoriteCitiesController {
  constructor(private readonly favoriteCitiesService: FavoriteCitiesService) {}

  @UseGuards(AuthGuard)
  @Post('add/')
  async create(@GetUser() user: any, @Body() cityData: CreateFavoriteCityDto) {
    return this.favoriteCitiesService.create(user, cityData)
  }

  @UseGuards(AuthGuard)
  @Get('user/')
  findAllByUserId(@GetUser() user: any) {
    return this.favoriteCitiesService.findAllFavoriteCitiesByUserToken(user);
  }

  @UseGuards(AuthGuard)
  @Patch('remove/:city_id')
  async removeFavoriteCityUser(@GetUser() user: any, @Param('city_id') city_id: string) {
    return this.favoriteCitiesService.removeFavoriteCity(user, city_id);
  }

}
