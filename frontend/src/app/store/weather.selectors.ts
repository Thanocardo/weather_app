import { createSelector, createFeatureSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectCities = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.cities
);

export const selectCurrentWeather = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.currentWeather
);

export const selectSelectedCity = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.selectedCity
);

export const selectForecast = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.forecast
);

export const selectFavorites = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.favorites
);