import { Routes } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Home } from './components/home/home';
import { Pomodoro } from './components/pomodoro/pomodoro';

export const routes: Routes = [
  {
    path: '',
    component: Navbar,
    children: [
      { path: '', component: Home },
      { path: 'pomodoro', component: Pomodoro }
    ]
  }
];