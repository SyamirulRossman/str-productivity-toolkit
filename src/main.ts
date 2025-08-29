import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideZonelessChangeDetection } from '@angular/core';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideZonelessChangeDetection()
  ]
}).catch(err => console.error(err));
