import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { UsersSignUpComponent } from './users/users.sign.up.component';
import { UsersLoginComponent } from './users/users.login.component';
import { PopularCitiesPageComponent } from './popular-cities-page/popular-cities-page.component';

export const routes: Routes = [
    {
        path: "",
        title: "Weather",
        component: SearchPageComponent
    },
    {
        path: "favourite",
        title: "Favourite Cities",
        component: FavouritePageComponent
    },
    {
        path: "signup",
        title: "Sign Up",
        component: UsersSignUpComponent
    },
    {
        path: "login",
        title: "Login",
        component: UsersLoginComponent
    },
    {
        path: 'popular-cities',
        title: "Popular Cities",
        component: PopularCitiesPageComponent,
    }

];
