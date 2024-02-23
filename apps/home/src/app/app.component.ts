import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProximityGlowCardsComponent } from 'libs/ui/src/lib/proximity-glow-cards/proximity-glow-cards.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ProximityGlowCardsComponent],
  selector: 'home-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'home';
}
