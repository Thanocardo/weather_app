import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';

export const routes: Routes = [
    {
        path: "",
        title: "Search",
        component: SearchPageComponent
    },
    {
        path: "favourite",
        title: "Favourite",
        component: FavouritePageComponent
    }
];
