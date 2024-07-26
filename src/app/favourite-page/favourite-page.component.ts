import { Component } from '@angular/core';
import { BasePageCompoment } from '../base-page/base-page.component';

@Component({
  selector: 'app-favourite-page',
  standalone: true,
  imports: [],
  templateUrl: './favourite-page.component.html',
  styleUrl: './favourite-page.component.css'
})
export class FavouritePageComponent extends BasePageCompoment {

  ngOnInit(): void {
    this.cities = this.FavoriteHandler.getFavorites();
    this.cities.forEach((city: any) => {
      this.WeatherApiHandler.getCurrentWeather(city.Key).subscribe(weatherData => {
        this.currentWeather[city.Key] = weatherData[0]
      ;})
    ;})
  }
}
