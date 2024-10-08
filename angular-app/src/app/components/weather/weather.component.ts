import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';
import { WeatherapiResponse } from './weather.interfaces';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-weather',
    standalone: true,
    templateUrl: './weather.component.html',
    styleUrl: './weather.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FontAwesomeModule],
})
export class WeatherComponent {
    protected readonly httpClient = inject(HttpClient);

    faCloudSun = faCloudSun;
    weatherData$ = new BehaviorSubject<WeatherapiResponse | null>(null);

    getData(): void {
        this.httpClient
            .get<WeatherapiResponse>(
                'https://api.weatherapi.com/v1/current.json?key=4b9c79a9f1004a00af794544242602&q=Wiesbaden&aqi=no'
            )
            .pipe(take(1))
            .subscribe((val) => {
                console.log(val);
                this.weatherData$.next(val);
            });
    }
}
