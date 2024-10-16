import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap, } from 'rxjs';
import { City } from '../store/weather.actions';

@Injectable({
    providedIn: 'root'
  })
export class PopularCitiesHandler {
  private apiUrl = 'http://localhost:3000/popular-cities'

  constructor(private http: HttpClient) {}

  getPopularCities(): Observable<any> {
    return this.http.get<City[]>(`${this.apiUrl}`)
  }

  increaseSearchCount(cityData: City[]): Observable<any> {
    return this.http.patch(`${this.apiUrl}/increase/`, cityData)
  }

}