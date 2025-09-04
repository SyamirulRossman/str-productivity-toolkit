import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material.imports';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, MATERIAL_IMPORTS],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(
    private router: Router
  ) {}

  openRouteInNewTab(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
