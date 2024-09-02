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
    private jwtService: JwtService
  ) {}

  async create(token: string, cityData: CreateFavoriteCityDto) {
    
    let decodedToken;
    try {
      this.jwtService.verify(token);
    }
    catch (error) {
      throw new UnauthorizedException("Invalid token");
    }

    decodedToken = this.jwtService.decode(token)

    const user_id = decodedToken.user_id;

    const user = await this.userRepository.findOne({where: {id: user_id }});
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

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

    return await this.favCityRepository.save(favoriteCity);
    
  }

  async findAllFavoriteCitiesByUserToken(token: string): Promise<FavoriteCity[]> {

    let decodedToken;
    
    try {
      this.jwtService.verify(token);
      decodedToken = this.jwtService.decode(token)
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    let cities = this.favCityRepository.find({
      where: {
        user: {id: decodedToken.user_id},
      }
    })

    return await cities 
  }

  async removeFavoriteCity(token: string, city_id: string) {

    let decodedToken;
    
    try {
      this.jwtService.verify(token);
      decodedToken = this.jwtService.decode(token)
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const favoriteCity = await this.favCityRepository.find({
      where: {
        key: city_id,
        user: {id: decodedToken.user_id},
      },
    });

    if (!favoriteCity) {
      throw new NotFoundException('Favorite city not found for the user');
    }

    favoriteCity.forEach(city => city.user = null);

    await this.favCityRepository.save(favoriteCity);
  }
}
