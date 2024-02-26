import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProximityGlowCardsComponent } from 'libs/ui/src/lib/migratet-to-angular/proximity-glow-cards/proximity-glow-cards.component';
import { WeatherComponentComponent } from 'libs/ui/src/lib/components/weather-component/weather-component.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ProximityGlowCardsComponent, WeatherComponentComponent],
  selector: 'home-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'home';
}
