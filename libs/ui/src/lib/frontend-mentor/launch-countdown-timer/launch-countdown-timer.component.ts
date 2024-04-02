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

interface TimeArrayItem {
  id: string;
  label: string;
  value: number;
  change: boolean;
}

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
  time = new BehaviorSubject<TimeArrayItem[]>([
    {
      id: 'days',
      label: 'Days',
      value: 8,
      change: false,
    },
    {
      id: 'hours',
      label: 'Hours',
      value: 23,
      change: false,
    },
    {
      id: 'minutes',
      label: 'Minutes',
      value: 55,
      change: false,
    },
    {
      id: 'seconds',
      label: 'Seconds',
      value: 41,
      change: false,
    },
  ]);

  prevSeconds = 41;
  targetDate = new Date('2024-10-31');
  interval?: NodeJS.Timer ;
  animate = new BehaviorSubject(false);

  constructor(@Inject(PLATFORM_ID) protected readonly platformId: string,) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
      this.counter();
  }

  counter(): void {
    this.interval = setInterval(() => {
      this.animate.next(false);
      this.time.next(this.getTime())
      setTimeout(() => {
        this.animate.next(true);
      }, 100);
    }, 1000);
  }

  getTime(): TimeArrayItem[] {
    const timeArray:TimeArrayItem[] = [];
    const newTime = new Date();
    const diffMs = this.targetDate.getTime() - newTime.getTime();

    const tmpDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const tmpHours = Math.floor(diffMs / (1000 * 60 * 60));
    const tmpMin = Math.floor(diffMs / (1000 * 60));
    const tmpSec = Math.floor(diffMs / (1000));

    const diffDays = tmpDays;
    const diffHours = tmpHours - (tmpDays * 24);
    const diffMin = tmpMin - (tmpHours * 60);
    const diffSec = tmpSec - (tmpMin * 60);

    if (diffDays > 0) {
      timeArray.push({
        id: 'days',
        label: 'Days',
        value: diffDays,
        change: diffHours === 0 && diffMin === 0 && diffSec === 0,
      });
    }
    if (diffHours > 0 && diffDays > 0) {
      timeArray.push({
        id: 'hours',
        label: 'Hours',
        value: diffHours,
        change: diffMin === 0 && diffSec === 0,
      });
    }
    if (diffMin > 0 && diffHours > 0) {
      timeArray.push({
        id: 'minutes',
        label: 'Minutes',
        value: diffMin,
        change: diffSec === 0,
      });
    }
    timeArray.push({
      id: 'seconds',
      label: 'Seconds',
      value: diffSec,
      change: this.prevSeconds !== diffSec,
    });
    this.prevSeconds = diffSec;
    return timeArray;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
