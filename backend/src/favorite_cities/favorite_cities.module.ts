import { Module } from '@nestjs/common';
import { FavoriteCitiesService } from './favorite_cities.service';
import { FavoriteCitiesController } from './favorite_cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteCity } from './entities/favorite_city.entity';
import { User } from 'src/users_data/entities/users_data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteCity, User])],
  controllers: [FavoriteCitiesController],
  providers: [FavoriteCitiesService],
  exports: [FavoriteCitiesService],
})
export class FavoriteCitiesModule {}
