import { Component } from '@angular/core';
import { timer, map, ReplaySubject, takeUntil } from 'rxjs';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { FormControl } from '@angular/forms';

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

  zoneFilterCtrl = new FormControl();
  filteredZones: string[] = [];

  flagUrl?: string;

  private _onDestroy = new ReplaySubject<void>(1);

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
  };

  ngOnInit() {
    // init full list
    this.filteredZones = this.timeZones.slice();

    // listen to search changes
    this.zoneFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(search => {
        this.filteredZones = this.timeZones.filter(zone =>
          zone.toLowerCase().includes((search || '').toLowerCase())
        );
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  openRouteInNewTab(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
}