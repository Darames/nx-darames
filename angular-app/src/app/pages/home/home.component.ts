import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProximityGlowCardsComponent } from '../../migratet-to-angular/proximity-glow-cards/proximity-glow-cards.component';
import { WeatherComponent } from '../../components/weather/weather.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        ProximityGlowCardsComponent,
        WeatherComponent,
        RouterLink,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    title = 'portfolio';

    pages = [
        {
            label: 'Countdown',
            link: '/countdown',
            img: 'assets/frontend-mentor/launch-countdown-timer/design/desktop-preview.jpg',
        },
    ];
}
