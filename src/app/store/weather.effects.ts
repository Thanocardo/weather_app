import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherApiHandler } from '../_handlers/weather-api-handler';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as WeatherActions from '../store/weather.actions';

@Injectable()
export class WeatherEffects {

  constructor(
    private actions$: Actions,
    private weatherApiHandler: WeatherApiHandler
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
      map(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
        return WeatherActions.loadFavoritesSuccess({ favorites });
      })
    )
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.addFavorite),
      map(action => {
        const favorites = JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
        favorites.push(action.city);
        localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
        return WeatherActions.loadFavoritesSuccess({ favorites });
      })
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.removeFavorite),
      map(action => {
        let favorites = JSON.parse(localStorage.getItem('favoriteLocations') || '[]');
        favorites = favorites.filter((city: any) => city.Key !== action.cityKey);
        localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
        return WeatherActions.loadFavoritesSuccess({ favorites });
      })
    )
  );
}