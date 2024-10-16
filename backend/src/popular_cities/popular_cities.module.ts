import { Module } from '@nestjs/common';
import { PopularCitiesService } from './popular_cities.service';
import { PopularCitiesController } from './popular_cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopularCity } from './entities/popular_city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopularCity])],
  controllers: [PopularCitiesController],
  providers: [PopularCitiesService],
  exports: [PopularCitiesService],
})
export class PopularCitiesModule {}
