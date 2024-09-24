import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap, tap, } from 'rxjs';
import { City } from '../store/weather.actions';
import { AuthService } from './auth';

@Injectable({
    providedIn: 'root'
  })
export class FavoriteHandler {
  private apiUrl = 'http://localhost:3000/fav-cities'

  constructor(private http: HttpClient) {}

  getFavoriteCities(token?: string) {
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<City[]>(`${this.apiUrl}/user`, { headers }).pipe(
        tap(cities => {
          localStorage.setItem('favoriteLocations', JSON.stringify(cities));
        })
      );
    }
  
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
    return of(storedFavorites);
  }
  
  addFavoriteCity(city: City, token?: string) {
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.apiUrl}/add`, city, { headers }).pipe(
        switchMap(() => this.getFavoriteCities(token))
      );
    }
  
    let favorites = JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
    favorites.push(city); 
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    return of(favorites); 
  }
  
  removeFavoriteCity(city: City, token?: string) {
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.patch(`${this.apiUrl}/remove/${city.Key}`, {}, { headers }).pipe(
        switchMap(() => this.getFavoriteCities(token))
      );
    }
  
    const favorites = JSON.parse(localStorage.getItem('favoriteLocations') || '[]').filter((fav: City) => fav.Key !== city.Key);
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    return of(favorites);
  }

}