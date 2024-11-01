import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { WeatherEffects } from './store/weather.effects';
import { reducers } from './store/app.state';
import { AuthInterceptor } from './_handlers/interseptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptorsFromDi()), provideStore(reducers), provideEffects([WeatherEffects]), {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
};
