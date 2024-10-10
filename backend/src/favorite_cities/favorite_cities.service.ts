import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FavoriteCity } from './entities/favorite_city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users_data/entities/users_data.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateFavoriteCityDto } from './dto/create-favorite_city.dto';

@Injectable()
export class FavoriteCitiesService {
  constructor(
    @InjectRepository(FavoriteCity)
    private readonly favCityRepository: Repository<FavoriteCity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user_data: any, cityData: CreateFavoriteCityDto) {

    const user_id = user_data.user_id;

    const user = await this.userRepository.findOne({where: { id: user_id }});

    const favoriteCity = this.favCityRepository.create({
      key: cityData.Key,
      version: cityData.Version,
      type: cityData.Type,
      rank: cityData.Rank,
      localizedName: cityData.LocalizedName,
      country_id: cityData.Country.ID,
      country_localized_name: cityData.Country.LocalizedName,
      administrative_area_id: cityData.AdministrativeArea.ID,
      administrative_area_localized_name: cityData.AdministrativeArea.LocalizedName,
      user: user,
    });

    await this.favCityRepository.save(favoriteCity);

    return await this.findAllFavoriteCitiesByUserToken(user_data);
    
  }

  async findAllFavoriteCitiesByUserToken(user_data: any) {

    const user_id = user_data.user_id;

    const cities = await this.favCityRepository.find({
      where: { user: {id: user_id}}
    })
    
    const toReturn = this.mapToCityInterface(cities)

    return await toReturn
  }

  async removeFavoriteCity(user_data: any, city_id: string) {

    const user_id = user_data.user_id;

    const favoriteCity = await this.favCityRepository.find({
      where: {
        key: city_id,
        user: {id: user_id},
      },
    });

    if (!favoriteCity) {
      throw new NotFoundException('Favorite city not found for the user');
    }

    favoriteCity.forEach(city => city.user = null);

    await this.favCityRepository.save(favoriteCity);

    return await this.findAllFavoriteCitiesByUserToken(user_data);
  }

  mapToCityInterface(favoriteCities) {
    return favoriteCities.map(city => ({
      Version: city.version,
      Key: city.key,
      Type: city.type,
      Rank: city.rank,
      LocalizedName: city.localizedName,
      Country: {
        ID: city.country_id,
        LocalizedName: city.country_localized_name
      },
      AdministrativeArea: {
        ID: city.administrative_area_id,
        LocalizedName: city.administrative_area_localized_name
      }
    }));
  }
}

