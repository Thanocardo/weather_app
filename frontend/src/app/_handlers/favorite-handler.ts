import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { City } from '../store/weather.actions';
import { AuthService } from './auth';

@Injectable({
    providedIn: 'root'
  })
export class FavoriteHandler {
  private apiUrl = 'http://localhost:3000/fav-cities'

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavoriteCities(token?: string) {
    if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`${this.apiUrl}/user`, { headers })
    .subscribe(data => 
      localStorage.setItem('favoriteLocations', JSON.stringify(data))
    );

    }
    return JSON.parse(localStorage.getItem('favoriteLocations') || '[]')
    }

  addFavoriteCity(city: City, token?: string) {
    if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/add`,  city, { headers })
    }
    let favorites = this.getFavoriteCities();
    favorites.push(city);
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    return of(favorites)
    }


  removeFavoriteCity(city: City, token?: string) {
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.patch(`${this.apiUrl}/remove/${city.Key}`, {}, { headers }).subscribe()
    }
    const favorites = this.getFavoriteCities().filter((fav: City) => fav.Key !== city.Key) 
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    return of(favorites)
  }
}