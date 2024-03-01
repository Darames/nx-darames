import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-launch-countdown-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './launch-countdown-timer.component.html',
  styleUrl: './launch-countdown-timer.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchCountdownTimerComponent implements OnInit, OnDestroy {
  time = [
    {
      id: 'days',
      label: 'Days',
      value: 8
    },
    {
      id: 'hours',
      label: 'Hours',
      value: 23
    },
    {
      id: 'minutes',
      label: 'Minutes',
      value: 55
    },
    {
      id: 'seconds',
      label: 'Seconds',
      value: 41
    },
  ];

  targetDate = new Date('2024-11-01');
  // interval?: NodeJS.Timer ;
  ngOnInit(): void {
    // this.interval = setInterval(() => {
      const newTime = new Date();
      const diffMs = Math.abs(this.targetDate.getTime() - newTime.getTime());
      const diffSec = Math.ceil(diffMs / (1000));
      const diffMin = Math.ceil(diffMs / (1000 * 60));
      const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));


      this.time[0].value = diffDays;
      this.time[1].value =(diffDays*24) - diffHours;
      this.time[2].value = (diffHours*60) - diffMin;
      this.time[3].value = (diffMin*60) - diffSec;
      // console.log((diffSec*1000) - diffMs," milliseconds");
      // console.log((diffMin*60) - diffSec," seconds");
      // console.log((diffHours*60) - diffMin," minutes");
      // console.log((diffDays*24) - diffHours," hours");
      // console.log(diffDays, " days");
    // }, 1000);
  }

  ngOnDestroy(): void {
    // clearInterval(this.interval);
  }
}
