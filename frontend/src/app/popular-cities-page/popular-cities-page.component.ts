import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { selectPopularCities } from '../store/weather.selectors';
import * as WeatherActions from '../store/weather.actions';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popupar-cities-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './popular-cities-page.component.html',
  styleUrl: './popular-cities-page.component.css'
})
export class PopularCitiesPageComponent extends BasePageComponent implements OnInit {
  popularCities = this.store.select(selectPopularCities)
  maxCities = 10;
  display_options = [10, 15, 20, 25, 30, 40, 50]


  ngOnInit(): void {
    this.store.dispatch(WeatherActions.loadPopularCities());

    this.popularCities.subscribe(cities => {
        cities.forEach(city => {
          this.store.dispatch(WeatherActions.loadCurrentWeather({ cityKey: city.Key }))
        })
      }
    )
  }
}
