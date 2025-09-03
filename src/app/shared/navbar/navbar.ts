import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material.imports';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, MATERIAL_IMPORTS, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
}
