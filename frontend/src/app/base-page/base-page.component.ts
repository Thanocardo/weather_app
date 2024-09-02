import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FavoriteHandler } from '../_handlers/favorite-handler';
import { selectCities, selectCurrentWeather, selectFavorites, selectForecast } from '../store/weather.selectors';
import { AppState } from '../store/app.state';
import * as WeatherActions from '../store/weather.actions';
import { City } from '../store/weather.actions';
import { AuthService } from '../_handlers/auth';
import { map } from 'rxjs';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [],
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent {
  cities = this.store.select(selectCities);
  favorites = this.store.select(selectFavorites);
  currentWeather = this.store.select(selectCurrentWeather);
  forecast = this.store.select(selectForecast);
  selectedCity = {};
  temperatureUnit = 'C';

  cityForm = new FormGroup({
    city: new FormControl('')
  });

  constructor(public store: Store<AppState>, public authService: AuthService) {}

  FavoriteHandler = inject(FavoriteHandler)

  selectCity(city: any): void {
    this.selectedCity = city;
    this.store.dispatch(WeatherActions.load5DayForecast({ cityKey: city.Key }));
  }

  unselectCity(): void {
    this.selectedCity = {};
  }

  // toggleFavorite(city: any): void {
  //   console.log(this.authService.isAuthenticated())
  //   if (this.isFavorite(city)) {
  //     this.store.dispatch(WeatherActions.removeFavorite({ cityKey: city.Key }));
  //   } else {
  //     this.store.dispatch(WeatherActions.addFavorite({ city }));
  //   }
  // }

  // isFavorite(city: City): boolean {
  //   let isFav = false;
  //   this.favorites.subscribe(favorites => {
  //     isFav = !!favorites.find(fav => fav === city);
  //   });
  //   console.log(isFav)
  //   return isFav;
  // }

  toggleFavorite(city: City): void {
    const isFav = this.isFavorite(city.Key)
    if (isFav) {
      console.log(this.authService.isAuthenticated())
      this.store.dispatch(WeatherActions.removeFavorite({ cityKey: city.Key }));
    }
    else {
      this.store.dispatch(WeatherActions.addFavorite({ city }));
    }
  }


  // isFavorite(curCity) {
  //   if (this.FavoriteHandler.favorites.find(curCity) > 0) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }

  // // this.favorites.subscribe(cities => {for (let city of cities) {
  // //   if (city.Key === curCity.Key) {
  // //     isFav = true
  // //     break
  // //   }}}
  // // )
  // // this.favorites.subscribe(cities =>
  // //   // {if (cities.some(city => city.Key === curCity.Key)
  // //   // console.log(typeof cities)
  // //   console.log(this.cities)
  // //   // console.log(cities.values)
  // // ) 
  // // {
  // //   isFav = true
  // // }}
  // // )

  // //   const isFav = this.favorites.subscribe(cities => cities.map(city => {if(city.Key === curCity.Key) { return true } else {return false}} ))
    
  // // this.favorites.pipe(
  // //     map(cities => cities.some(city => city.Key === curCity.Key))
  // //   )
  // // this.favorites.subscribe(cities => cities.forEach(city => city.Key === curCity.Key ? isFav = true : isFav = isFav))

  // // return isFav
  // }

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
