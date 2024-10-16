import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import * as WeatherActions from '../store/weather.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourite-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent extends BasePageComponent implements OnInit {

  ngOnInit(): void {
    this.store.dispatch(WeatherActions.loadFavorites())
      this.favorites.subscribe(cities => {
        ensureArray(cities).forEach(city => {
          this.store.dispatch(WeatherActions.loadCurrentWeather({ cityKey: city.Key }));
        });
      });
  }
}


const ensureArray = <T>(data: T | T[]): T[] => {
  return Array.isArray(data) ? data : [data];
};