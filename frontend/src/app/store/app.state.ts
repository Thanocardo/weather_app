import { ActionReducerMap } from '@ngrx/store';
import { weatherReducer, WeatherState } from './weather.reducer.js';

export interface AppState {
  weather: WeatherState;
}

export const reducers: ActionReducerMap<AppState> = {
  weather: weatherReducer,
};


