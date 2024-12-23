import { createReducer, on } from "@ngrx/store";
import { City, WeatherData, WeatherForecast } from "./weather.actions";
import * as WeatherActions from '../store/weather.actions';
import { Observable } from "rxjs";

export interface WeatherState {
    cities: City[];
    currentWeather: { [cityKey: string]: WeatherData };
    selectedCity: any,
    forecast: WeatherForecast | null;
    favorites: any;
    popularCities: City[];
    error: string | null;
  }
  
export const initialState: WeatherState = {
    cities: [{"Version":1,"Key":"51097","Type":"City","Rank":20,"LocalizedName":"Sofia","Country":{"ID":"BG","LocalizedName":"Bulgaria"},"AdministrativeArea":{"ID":"22","LocalizedName":"Sofia City"}}],
    currentWeather: {},
    selectedCity: {},
    forecast: null,
    favorites: [],
    popularCities: [],
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
    on(WeatherActions.removeFavorite, (state, { city }) => ({
      ...state,
      favorites: state.favorites.filter(fav => fav.Key !== city.Key),
    })),
    on(WeatherActions.loadFavoritesSuccess, (state, { favorites }) => ({
      ...state,
      favorites,
      error: null,
    })),
    on(WeatherActions.loadPopularCitiesSuccess, (state, { popularCities }) => ({
      ...state,
      popularCities,
      error: null
    })),
    on(WeatherActions.loadPopularCitiesFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(WeatherActions.increaseSearchCountOfPopularCitiesSuccess, (state, { popularCities }) => ({
      ...state,
      popularCities,
      error: null
    })),
    on(WeatherActions.increaseSearchCountOfPopularCitiesFailure, (state, { error }) => ({
      ...state,
      error,
    })),
  );




 