import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards, Req } from '@nestjs/common';
import { FavoriteCitiesService } from './favorite_cities.service';
import { AuthGuard } from 'src/users_data/auth/auth.guard';
import { CreateFavoriteCityDto } from './dto/create-favorite_city.dto';

@Controller('fav-cities')
export class FavoriteCitiesController {
  constructor(private readonly favoriteCitiesService: FavoriteCitiesService) {}

  @UseGuards(AuthGuard)
  @Post('add/')
  async create(@Headers('Authorization') authHeader: string, @Body() cityData: CreateFavoriteCityDto) {
    const token = authHeader.replace('Bearer ', '');
    return this.favoriteCitiesService.create(token, cityData)
  }

  @UseGuards(AuthGuard)
  @Get('user/')
  findAllByUserId(@Headers('Authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    return this.favoriteCitiesService.findAllFavoriteCitiesByUserToken(token);
  }

  @UseGuards(AuthGuard)
  @Patch('remove/:city_id')
  async removeFavoriteCityUser(@Headers('Authorization') authHeader: string, @Param('city_id') city_id: string) {
    const token = authHeader.replace('Bearer ', '');
    await this.favoriteCitiesService.removeFavoriteCity(token, city_id);
  }

}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favoriteCitiesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavoriteCityDto: UpdateFavoriteCityDto) {
  //   return this.favoriteCitiesService.update(+id, updateFavoriteCityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.favoriteCitiesService.remove(+id);
  // }
