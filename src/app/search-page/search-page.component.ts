import { Component } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BasePageCompoment } from '../base-page/base-page.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent extends BasePageCompoment {

  ngOnInit(): void {
    const sofiaCityKey = "51097";
      this.WeatherApiHandler.getCurrentWeather(sofiaCityKey).subscribe(
        {
          next: (weatherData: any[]) => {
            this.currentWeather[sofiaCityKey] = weatherData[0];
          },
          error: () => {
            this.cities = []
          }
        }
      );
    };

  searchCity (city: string) {
    this.cities = []  
    this.WeatherApiHandler.getCityAutocomplete(city).subscribe(data => {
      this.cities = data;
      this.cities.forEach((city: any) => {
        this.WeatherApiHandler.getCurrentWeather(city.Key).subscribe(weatherData => {
          this.currentWeather[city.Key] = weatherData[0];
        });
      });
    });
    this.selectedCity = {}
    this.forecast = {}
  }
}
