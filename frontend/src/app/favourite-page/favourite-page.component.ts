import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { selectFavorites } from '../store/weather.selectors';
import * as WeatherActions from '../store/weather.actions';
import { CommonModule } from '@angular/common';
import { AuthService } from '../_handlers/auth';

@Component({
  selector: 'app-favourite-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent extends BasePageComponent implements OnInit {
  // favorites = this.store.select(selectFavorites);
  // fav_test: any;

  ngOnInit(): void {
    // if (this.authService.isAuthenticated()) {
    //   this.FavoriteHandler.getFavoriteCities(this.authService.getToken()!).subscribe({
    //     next: (response) => {
    //       this.fav_test = response
    //       console.log('Favorite cities', response);
    //     },
    //     error: (err) => {
    //       console.error('Error fetching favorite cities', err);
    //     }
    //   });
    //   console.log(this.fav_test)
    //   this.fav_test.subscribe(cities => {
    //     cities.forEach(city => {
    //       this.store.dispatch(WeatherActions.loadCurrentWeather({ cityKey: city.Key }))
    //     })
    //   })
    // }
    // else {
      this.store.dispatch(WeatherActions.loadFavorites());
      console.log(this.favorites)
      this.favorites.subscribe(cities => {
        cities.forEach(city => {
          this.store.dispatch(WeatherActions.loadCurrentWeather({ cityKey: city.Key }));
        });
      });
    // }
  }

}
