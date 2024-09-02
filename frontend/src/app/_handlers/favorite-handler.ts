import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { City } from '../store/weather.actions';
import { AuthService } from './auth';

@Injectable({
    providedIn: 'root'
  })
export class FavoriteHandler {
  private apiUrl = 'http://localhost:3000/fav-cities'
  favorites;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavoriteCities(token?: string) {
    if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user`, { headers })
    .pipe(
      map(response => {
        console.log(this.mapToCityInterface(response))
        console.log(typeof this.mapToCityInterface(response))

        this.favorites = this.mapToCityInterface(response)

        return this.mapToCityInterface(response);
      })
    )

  //   // .subscribe(response => 
  //   //   this.mapToCityInterface(response)
  //   //   // console.log(this.mapToCityInterface(response))
  //   // )

  //   // .pipe(
  //   //   catchError(error => {
  //   //     console.error('Error fatching favorite cities', error);
  //   //     return throwError(() => error);
  //   //   })
  //   // )
  }
    else {
      return JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
    }
  }
  // if (token) {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get(`${this.apiUrl}/user`, { headers })
  //   .pipe(
  //     map(response => {
  //       console.log(this.mapToCityInterface(response))
  //       console.log(typeof this.mapToCityInterface(response))
  //       localStorage.setItem('favoriteLocations', JSON.stringify(this.mapToCityInterface(response)));
  //     })
  //   )
  // }
  //   return JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
  // }

  addFavoriteCity(city: City, token?: string) {
    const favorites = this.getFavoriteCities();
    if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`${this.apiUrl}/add`,  city, { headers }).subscribe(response => {})
    console.log(token)
    console.log(city)
    // .pipe(
    //   map(response => response),
    //   catchError(error => {
    //     console.error('Error adding favorite city', error);
    //     return throwError(() => error);
    //   })
    // );
  }
    favorites.push(city);
    console.log(city)
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
  }

  removeFavoriteCity(city_id: string, token?: string) {
    if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.patch(`${this.apiUrl}/remove/${city_id}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error removing favorite city', error);
        return throwError(() => error);
      })
    );
    this.favorites = this.getFavoriteCities(token)
  }
    const favorites = this.getFavoriteCities().filter((fav: City) => fav.Key !== city_id);
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
  }

  mapToCityInterface(favoriteCities) {
    return favoriteCities.map(city => ({
      Version: city.version,
      Key: city.key,
      Type: city.type,
      Rank: city.rank,
      LocalizedName: city.localizedName,
      Country: {
        ID: city.country_id,
        LocalizedName: city.country_localized_name
      },
      AdministrativeArea: {
        ID: city.administrative_area_id,
        LocalizedName: city.administrative_area_localized_name
      }
    }));
  }

    // getFavorites(): any[] {
    //   return JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
    // }
  
    // addFavorite(location: any): void {
    //   const favorites = this.getFavorites();
    //   favorites.push(location);
    //   localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    // }
  
    // removeFavorite(locationKey: string): void {
    //   const favorites = this.getFavorites().filter(fav => fav.Key !== locationKey);
    //   localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    // }
  
    // isFavorite(locationKey: string): boolean {
    //   return this.getFavorites().some(fav => fav.Key === locationKey);
    // }
}