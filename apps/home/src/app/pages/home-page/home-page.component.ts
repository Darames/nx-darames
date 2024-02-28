import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from 'libs/ui/src/lib/components/weather/weather.component';
import { ProximityGlowCardsComponent } from 'libs/ui/src/lib/migratet-to-angular/proximity-glow-cards/proximity-glow-cards.component';

@Component({
    selector: 'home-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, WeatherComponent, ProximityGlowCardsComponent]
})
export class HomePageComponent {}



