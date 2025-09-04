import { Component, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  date = new Date()
  time$ = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  );
}
