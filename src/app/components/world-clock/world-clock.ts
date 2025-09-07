import { Component } from '@angular/core';
import { timer, map } from 'rxjs';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  selector: 'app-world-clock',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './world-clock.html',
  styleUrl: './world-clock.scss'
})
export class WorldClock {
  selectedZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timeZones: string[] = Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : [];

  // observable that ticks every second
  time$ = timer(0, 1000).pipe(map(() => new Date()));

  getFormattedTime(date: Date): string {
    try {
      return date.toLocaleString('en-US', {
        timeZone: this.selectedZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return 'Invalid TimeZone';
    }
  }
}