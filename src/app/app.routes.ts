import { Routes } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Home } from './components/home/home';
import { Pomodoro } from './components/pomodoro/pomodoro';
import { WorldClock } from './components/world-clock/world-clock';
import { UuidGenerator } from './components/uuid-generator/uuid-generator';

export const routes: Routes = [
  {
    path: '',
    component: Navbar,
    children: [
      { path: '', component: Home },
      { path: 'pomodoro', component: Pomodoro },
      { path: 'uuid-generator', component: UuidGenerator },
      { path: 'world-clock', component: WorldClock },
    ]
  }
];