import { Component, ViewEncapsulation, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';

@Component({
  selector: 'ui-weather-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './weather-component.component.html',
  styleUrl: './weather-component.component.scss',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponentComponent {

  protected readonly httpClient = inject(HttpClient)
  weatherData$ = new BehaviorSubject<any>(null);


  getData(): void {
    this.httpClient
    .get('https://api.weatherapi.com/v1/current.json?key=4b9c79a9f1004a00af794544242602 &q=Wiesbaden&aqi=no')
    .pipe(take(1)).subscribe((val) => {
      console.log(val);
      this.weatherData$.next(val);
    })
  }

}
