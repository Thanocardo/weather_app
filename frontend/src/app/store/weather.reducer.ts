import { createReducer, on } from "@ngrx/store";
import { City, WeatherData, WeatherForecast } from "./weather.actions";
import * as WeatherActions from '../store/weather.actions';

export interface WeatherState {
    cities: City[];
    currentWeather: { [cityKey: string]: WeatherData };
    selectedCity: any,
    forecast: WeatherForecast | null;
    favorites: City[];
    error: string | null;
  }
  
export const initialState: WeatherState = {
    cities: [{"Version":1,"Key":"51097","Type":"City","Rank":20,"LocalizedName":"Sofia","Country":{"ID":"BG","LocalizedName":"Bulgaria"},"AdministrativeArea":{"ID":"22","LocalizedName":"Sofia City"}}],
    currentWeather: {},
    selectedCity: {},
    forecast: null,
    favorites: [],
    error: null,
  };

export const weatherReducer = createReducer(
    initialState,
    on(WeatherActions.loadCityAutocompleteSuccess, (state, { cities }) => ({
      ...state,
      cities,
      error: null,
    })),
    on(WeatherActions.loadCityAutocompleteFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(WeatherActions.loadCurrentWeatherSuccess, (state, { cityKey, weather }) => ({
      ...state,
      currentWeather: {
        ...state.currentWeather,
        [cityKey]: weather,
      },
      error: null,
    })),
    on(WeatherActions.loadCurrentWeatherFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(WeatherActions.load5DayForecastSuccess, (state, { curforecast }) => ({
      ...state,
      forecast: curforecast,
      error: null,
    })),
    on(WeatherActions.load5DayForecastFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(WeatherActions.addFavorite, (state, { city }) => ({
      ...state,
      favorites: [...state.favorites, city],
    })),
    on(WeatherActions.removeFavorite, (state, { cityKey }) => ({
      ...state,
      favorites: state.favorites.filter(fav => fav.Key !== cityKey),
    })),
    on(WeatherActions.loadFavoritesSuccess, (state, { favorites }) => ({
      ...state,
      favorites,
      error: null,
    }))
  );




 