import { createAction, props } from "@ngrx/store";

export interface City {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: {ID: string, LocalizedName: string};
    AdministrativeArea: {ID: string, LocalizedName: string};
    search_count?: number,
}

export interface WeatherData {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType: string | null;
    IsDayTime: boolean;
    Temperature: {
        Metric: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
        Imperial: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
    };
    MobileLink: string;
    Link: string;
}

export interface WeatherForecast {
  Key: string;
  Headline: {
      EffectiveDate: string;
      EffectiveEpochDate: number;
      Severity: number;
      Text: string;
      Category: string;
      EndDate: string;
      EndEpochDate: number;
      MobileLink: string;
      Link: string;
  };
  DailyForecasts: {
      Date: string;
      EpochDate: number;
      Temperature: {
          Minimum: {
              Value: number;
              Unit: string;
              UnitType: number;
          };
          Maximum: {
              Value: number;
              Unit: string;
              UnitType: number;
          };
      };
      Day: {
          Icon: number;
          IconPhrase: string;
          HasPrecipitation: boolean;
          PrecipitationType?: string;
          PrecipitationIntensity?: string;
      };
      Night: {
          Icon: number;
          IconPhrase: string;
          HasPrecipitation: boolean;
          PrecipitationType?: string;
          PrecipitationIntensity?: string;
      };
      Sources: string[];
      MobileLink: string;
      Link: string;
  }[];
}

export const loadCityAutocomplete = createAction(
  '[Weather] Load City Autocomplete',
  props<{ query: string }>()
);

export const loadCityAutocompleteSuccess = createAction(
  '[Weather] Load City Autocomplete Success',
  props<{ cities: City[] }>()
);

export const loadCityAutocompleteFailure = createAction(
  '[Weather] Load City Autocomplete Failure',
  props<{ error: string }>()
);

export const loadCurrentWeather = createAction(
  '[Weather] Load Current Weather',
  props<{ cityKey: string }>()
);

export const loadCurrentWeatherSuccess = createAction(
  '[Weather] Load Current Weather Success',
  props<{ cityKey: string, weather: WeatherData }>()
);

export const loadCurrentWeatherFailure = createAction(
  '[Weather] Load Current Weather Failure',
  props<{ error: string }>()
);

export const load5DayForecast = createAction(
  '[Weather] Load 5-Day Forecast',
  props<{ cityKey: string }>()
);

export const load5DayForecastSuccess = createAction(
  '[Weather] Load 5-Day Forecast Success',
  props<{ curforecast: WeatherForecast }>()
);

export const load5DayForecastFailure = createAction(
  '[Weather] Load 5-Day Forecast Failure',
  props<{ error: string }>()
);

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ city: City }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ city: City }>()
);

export const loadFavorites = createAction('[Favorites] Load Favorites');

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites }>()
);

export const loadPopularCities = createAction('[Popular] Load Popular Cities',);

export const loadPopularCitiesSuccess = createAction(
  '[Popular] Load Popular Cities Success',
  props<{ popularCities: City[] }>()
);

export const loadPopularCitiesFailure = createAction(
  '[Weather] Load Popular Cities Failure',
  props<{ error: string }>()
);

export const increaseSearchCountOfPopularCities = createAction(
  '[Weather] Increase Search Count Of Popular Cities',
  props<{ popularCities: City[] }>()
);

export const increaseSearchCountOfPopularCitiesSuccess = createAction(
  '[Weather] Increase Search Count Of Popular Cities Success',
  props<{ popularCities: City[] }>()
);

export const increaseSearchCountOfPopularCitiesFailure = createAction(
  '[Weather] Increase Search Count Of Popular Cities Failure',
  props<{ error: string }>()
);