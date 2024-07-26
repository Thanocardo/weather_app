import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherApiHandler } from '../_handlers/weather-api-handler';
import { FavoriteHandler } from '../_handlers/favorite-handler'

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css'
})
export class BasePageCompoment {
  cities: any[] = [{"Version":1,"Key":"51097","Type":"City","Rank":20,"LocalizedName":"Sofia","Country":{"ID":"BG","LocalizedName":"Bulgaria"},"AdministrativeArea":{"ID":"22","LocalizedName":"Sofia City"}},];
  currentWeather: any = {};
  selectedCity: any = {};
  forecast: any = {};
  temperatureUnit = "C" 
  cityForm = new FormGroup ({
  city: new FormControl('')
})

WeatherApiHandler = inject(WeatherApiHandler)
FavoriteHandler = inject(FavoriteHandler)

  selectCity(city: any): void {
    this.selectedCity = city;
    this.WeatherApiHandler.get5DayForecast(city.Key).subscribe(data => {
      this.forecast = data;
      this.forecast["Key"] = city.Key
    });
  }

  unselectCity():void {
    this.selectedCity = {}
    this.forecast = {}
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
