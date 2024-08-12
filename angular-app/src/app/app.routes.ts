import { Routes } from '@angular/router';
import { LaunchCountdownTimerComponent } from './frontend-mentor/launch-countdown-timer/launch-countdown-timer.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'countdown',
        component: LaunchCountdownTimerComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '',
    },
];
