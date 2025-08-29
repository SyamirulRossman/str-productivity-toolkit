import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material.imports';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, MATERIAL_IMPORTS],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
