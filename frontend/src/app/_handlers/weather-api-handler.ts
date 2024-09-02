import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiHandler {
  private apiKey = 'Your API';

  constructor(private http: HttpClient) { }

  getCityAutocomplete(query: string): Observable<any> {
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${query}`);
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    return this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`);
  }

  get5DayForecast(locationKey: string): Observable<any> {
    return this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}`);
  }
}