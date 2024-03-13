import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from 'libs/ui/src/lib/components/weather/weather.component';
import { ProximityGlowCardsComponent } from 'libs/ui/src/lib/migratet-to-angular/proximity-glow-cards/proximity-glow-cards.component';
import { LaunchCountdownTimerComponent } from 'libs/ui/src/lib/frontend-mentor/launch-countdown-timer/launch-countdown-timer.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'home-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, WeatherComponent, ProximityGlowCardsComponent, LaunchCountdownTimerComponent, RouterModule]
})
export class HomePageComponent {

  pages = [
    {
      label: 'Countdown',
      link: '/countdown'
    }
  ]
}



