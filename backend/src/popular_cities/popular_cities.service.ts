import { Injectable } from '@nestjs/common';
import { PopularCity } from './entities/popular_city.entity';
import { Repository } from 'typeorm';
import { PopularCityDto } from './dto/popular_city.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PopularCitiesService {

  constructor(
    @InjectRepository(PopularCity)
    private readonly popularCitiesRepository: Repository<PopularCity>
  ) {}

  async findAllPopularCities() {

    const cities = await this.popularCitiesRepository.find({
      order: {
        search_count: 'DESC'
      },
      take: 50,
    })
    
    const toReturn = this.mapToCityInterface(cities)

    return await toReturn
  }

  async increaseSearchCount(cityData: PopularCityDto[]) {
    console.log(cityData)

    for (let city of cityData) {
      console.log(city.Key)
      let toSaveCityawait = await this.checkIfCityExists(city)
      toSaveCityawait.search_count += 1
      await this.popularCitiesRepository.save(toSaveCityawait)
    }

    return this.findAllPopularCities()
  }

  async checkIfCityExists(cityData: PopularCityDto) {

    let city = await this.popularCitiesRepository.findOne({
      where: {
        key: cityData.Key
      }
    })

    if (!city) {
      city = this.popularCitiesRepository.create({
        key: cityData.Key,
        version: cityData.Version,
        type: cityData.Type,
        rank: cityData.Rank,
        localizedName: cityData.LocalizedName,
        country_id: cityData.Country.ID,
        country_localized_name: cityData.Country.LocalizedName,
        administrative_area_id: cityData.AdministrativeArea.ID,
        administrative_area_localized_name: cityData.AdministrativeArea.LocalizedName,
        search_count: 0,
      });
    }

    return city

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
      },
      search_count: city.search_count
    }));
  }
}
