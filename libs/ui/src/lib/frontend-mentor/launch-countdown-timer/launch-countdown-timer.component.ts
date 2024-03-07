import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'ui-launch-countdown-timer',
  standalone: true,
  imports: [CommonModule, PushPipe],
  templateUrl: './launch-countdown-timer.component.html',
  styleUrl: './launch-countdown-timer.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchCountdownTimerComponent implements OnInit, OnDestroy {
  time = new BehaviorSubject([
    {
      id: 'days',
      label: 'Days',
      value: 8,
      change: true,
    },
    {
      id: 'hours',
      label: 'Hours',
      value: 23,
      change: true,
    },
    {
      id: 'minutes',
      label: 'Minutes',
      value: 55,
      change: true,
    },
    {
      id: 'seconds',
      label: 'Seconds',
      value: 41,
      change: true,
    },
  ]);

  prevTime = {
    days: 8,
    hours: 23,
    minutes: 55,
    seconds: 41,
  }

  targetDate = new Date('2024-11-01');
  interval?: any ;
  animate = new BehaviorSubject(false);

  constructor(@Inject(PLATFORM_ID) protected readonly platformId: string,) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
      this.counter();
  }

  counter():void {
    this.interval = setInterval(() => {
      const timeArray:any = [];
      const newTime = new Date();
      const diffMs = this.targetDate.getTime() - newTime.getTime();

      const tmpDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const tmpHours = Math.floor(diffMs / (1000 * 60 * 60));
      const tmpMin = Math.floor(diffMs / (1000 * 60));
      const tmpSec = Math.floor(diffMs / (1000));

      const diffDays = tmpDays;
      const diffHours = Math.ceil(tmpHours - (tmpDays * 24));
      const diffMin = Math.ceil(tmpMin - (tmpHours * 60));
      const diffSec = Math.ceil(tmpSec - (tmpMin * 60));

      if (diffDays > 0) {
        timeArray.push({
          id: 'days',
          label: 'Days',
          value: diffDays,
          change: this.prevTime.days !== diffDays,
        });
        this.prevTime.days = diffDays;
      }
      if (diffHours > 0) {
        timeArray.push({
          id: 'hours',
          label: 'Hours',
          value: diffHours,
          change: this.prevTime.hours !== diffHours,
        });
        this.prevTime.hours = diffHours;
      }
      if (diffMin > 0) {
        timeArray.push({
          id: 'minutes',
          label: 'Minutes',
          value: diffMin,
          change: this.prevTime.minutes !== diffMin,
        });
        this.prevTime.minutes = diffMin;
      }
      timeArray.push({
        id: 'seconds',
        label: 'Seconds',
        value: diffSec,
        change: this.prevTime.seconds !== diffSec,
      });
      this.prevTime.seconds = diffSec;

      this.animate.next(false);
      this.time.next(timeArray)
      setTimeout(() => {
        this.animate.next(true);
      }, 100);
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  // https://www.joshwcomeau.com/react/folding-the-dom/
}
