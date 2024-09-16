import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';
import { CommonModule } from '@angular/common';
import * as WeatherActions from '../store/weather.actions';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent extends BasePageComponent implements OnInit {

  ngOnInit(): void {
    this.store.dispatch(WeatherActions.loadFavorites())
    const sofiaCityKey = '51097';
    this.store.dispatch(WeatherActions.loadCurrentWeather({ cityKey: sofiaCityKey }));
  }

  searchCity(city: string): void {
    this.store.dispatch(WeatherActions.loadCityAutocomplete({ query: city }));
    this.cities.subscribe(cities => {
      cities.forEach(city => {
        this.store.dispatch(WeatherActions.loadCurrentWeather({ cityKey: city.Key }))
      })
    })
  }
}
