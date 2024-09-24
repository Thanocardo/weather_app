import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherApiHandler } from '../_handlers/weather-api-handler';
import { catchError, exhaustMap, map, mergeMap, switchMap, } from 'rxjs/operators';
import { of } from 'rxjs';
import * as WeatherActions from '../store/weather.actions';
import { AuthService } from '../_handlers/auth';
import { FavoriteHandler } from '../_handlers/favorite-handler';

@Injectable()
export class WeatherEffects {

  constructor(
    private actions$: Actions,
    private weatherApiHandler: WeatherApiHandler,
    private authService: AuthService,
    private favoriteHandler: FavoriteHandler,
  ) {}

  loadCityAutocomplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadCityAutocomplete),
      mergeMap(action =>
        this.weatherApiHandler.getCityAutocomplete(action.query).pipe(
          map(cities => WeatherActions.loadCityAutocompleteSuccess({ cities })),
          catchError(error => of(WeatherActions.loadCityAutocompleteFailure({ error: error.message })))
        )
      )
    )
  );

  loadCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadCurrentWeather),
      mergeMap(action =>
        this.weatherApiHandler.getCurrentWeather(action.cityKey).pipe(
          map(weather => WeatherActions.loadCurrentWeatherSuccess({ cityKey: action.cityKey, weather: weather[0] })),
          catchError(error => of(WeatherActions.loadCurrentWeatherFailure({ error: error.message })))
        )
      )
    )
  );

  load5DayForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.load5DayForecast),
      mergeMap(action =>
        this.weatherApiHandler.get5DayForecast(action.cityKey).pipe(
          map(curforecast => WeatherActions.load5DayForecastSuccess({ curforecast })),
          catchError(error => of(WeatherActions.load5DayForecastFailure({ error: error.message })))
        )
      )
    )
  );

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadFavorites),
      exhaustMap(() => {
        if (this.authService.isAuthenticated()) {
          return this.favoriteHandler.getFavoriteCities(this.authService.getToken()).pipe(
            map(favorites => WeatherActions.loadFavoritesSuccess({ favorites }))
          );
        } else {
          const favorites = this.favoriteHandler.getFavoriteCities();
          return favorites.pipe(
            map(favorites => WeatherActions.loadFavoritesSuccess({ favorites }))
          );
        }
      })
    )
  );
  
  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.addFavorite),
      switchMap(action => {
        if (this.authService.isAuthenticated()) {
          return this.favoriteHandler.addFavoriteCity(action.city, this.authService.getToken()).pipe(
            map(favorites => WeatherActions.loadFavoritesSuccess({ favorites }))
          );
        } else {
          return this.favoriteHandler.addFavoriteCity(action.city).pipe(
            map(favorites => WeatherActions.loadFavoritesSuccess({ favorites }))
          );
        }
      })
    )
  );
  
  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.removeFavorite),
      switchMap(action => {
        if (this.authService.isAuthenticated()) {
          return this.favoriteHandler.removeFavoriteCity(action.city, this.authService.getToken()).pipe(
            map(favorites => WeatherActions.loadFavoritesSuccess({ favorites }))
          );
        } else {
          return this.favoriteHandler.removeFavoriteCity(action.city).pipe(
            map(favorites => WeatherActions.loadFavoritesSuccess({ favorites }))
          );
        }
      })
    )
  );
}