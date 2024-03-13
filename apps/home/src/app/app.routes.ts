import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LaunchCountdownTimerComponent } from '@angular-monorepo/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'countdown',
    component: LaunchCountdownTimerComponent,
    pathMatch: 'full',
  },
  {
    path:'**',
    redirectTo:'',
  }
];
