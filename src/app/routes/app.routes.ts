import { Routes } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { PopularComponent } from '../pages/popular/popular.component';
import { ChartsComponent } from '../pages/charts/charts.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent, pathMatch: 'full'
  },
  {
    path: 'profile', component: ProfileComponent,
  },
  {
    path: 'charts', component: ChartsComponent
  },
  {
    path: 'popular', component: PopularComponent
  },
  {
    path: '**', component: NotFoundComponent
  },
];
