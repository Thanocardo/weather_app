import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FavoriteHandler } from '../_handlers/favorite-handler';
import { selectCities, selectCurrentWeather, selectFavorites, selectForecast } from '../store/weather.selectors';
import { AppState } from '../store/app.state';
import * as WeatherActions from '../store/weather.actions';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [],
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent {
  cities = this.store.select(selectCities);
  currentWeather = this.store.select(selectCurrentWeather);
  forecast = this.store.select(selectForecast);
  selectedCity = {};
  temperatureUnit = 'C';

  cityForm = new FormGroup({
    city: new FormControl('')
  });

  constructor(public store: Store<AppState>) {}

  FavoriteHandler = inject(FavoriteHandler)

  selectCity(city: any): void {
    this.selectedCity = city;
    this.store.dispatch(WeatherActions.load5DayForecast({ cityKey: city.Key }));
  }

  unselectCity(): void {
    this.selectedCity = {};
  }

  toggleFavorite(city: any): void {
    if (this.isFavorite(city.Key)) {
      this.store.dispatch(WeatherActions.removeFavorite({ cityKey: city.Key }));
    } else {
      this.store.dispatch(WeatherActions.addFavorite({ city }));
    }
  }

  isFavorite(cityKey: string): boolean {
    let isFav = false;
    this.store.select(selectFavorites).subscribe(favorites => {
      isFav = !!favorites.find(fav => fav.Key === cityKey);
    });
    return isFav;
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
