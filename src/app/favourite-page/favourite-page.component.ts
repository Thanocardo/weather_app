import { Component, inject } from '@angular/core';
import { WeatherApiHandler } from '../_handlers/weather-api-handler';
import { FavoriteHandler } from '../_handlers/favorite-handler'

@Component({
  selector: 'app-favourite-page',
  standalone: true,
  imports: [],
  templateUrl: './favourite-page.component.html',
  styleUrl: './favourite-page.component.css'
})
export class FavouritePageComponent {
  favoriteCities: any[] = [];
  currentWeather: any = {};
  selectedCity: any;
  selectedCityWeather: any = []
  forecast: any = {};
  temperatureUnit = 'C';

  WeatherApiHandler = inject(WeatherApiHandler)
  FavoriteHandler = inject(FavoriteHandler)

  ngOnInit(): void {
    this.favoriteCities = this.FavoriteHandler.getFavorites();
    this.favoriteCities.forEach((city: any) => {
      this.WeatherApiHandler.getCurrentWeather(city.Key).subscribe(weatherData => {
        this.currentWeather[city.Key] = weatherData[0]
      ;})
    ;})
  }

  selectCity(city: any): void {
    this.selectedCity = city;
    this.WeatherApiHandler.get5DayForecast(city.Key).subscribe(data => {
      this.forecast = data;
    });
  }

  toggleFavorite(city: any): void {
    if (this.FavoriteHandler.isFavorite(city.Key)) {
      this.FavoriteHandler.removeFavorite(city.Key);
    } else {
      this.FavoriteHandler.addFavorite(city);
    }
  }

  getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  toggleCelsiusToFahrenheit(unit: string): void {
    this.temperatureUnit = unit === 'F' ? 'C' : 'F';
  }
}
