import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class FavoriteHandler {
  
    getFavorites(): any[] {
      return JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
    }
  
    addFavorite(location: any): void {
      const favorites = this.getFavorites();
      favorites.push(location);
      localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    }
  
    removeFavorite(locationKey: string): void {
      const favorites = this.getFavorites().filter(fav => fav.Key !== locationKey);
      localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    }
  
    isFavorite(locationKey: string): boolean {
      return this.getFavorites().some(fav => fav.Key === locationKey);
    }
  }