import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LaunchCountdownTimerComponent } from './frontend-mentor/launch-countdown-timer/launch-countdown-timer.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
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
