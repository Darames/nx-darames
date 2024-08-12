import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProximityGlowCardsComponent } from './migratet-to-angular/proximity-glow-cards/proximity-glow-cards.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        ProximityGlowCardsComponent,
        WeatherComponent,
        RouterLink,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'portfolio';

    pages = [
        {
            label: 'Countdown',
            link: '/countdown',
            img: 'assets/frontend-mentor/launch-countdown-timer/design/desktop-preview.jpg',
        },
    ];
}
