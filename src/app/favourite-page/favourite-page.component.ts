import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { selectFavorites } from '../store/weather.selectors';
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
  favorites = this.store.select(selectFavorites);

  ngOnInit(): void {
    this.store.dispatch(WeatherActions.loadFavorites());
    this.favorites.subscribe(cities => {
      cities.forEach(city => {
        this.store.dispatch(WeatherActions.loadCurrentWeather({ cityKey: city.Key }));
      });
    });
  }
}
