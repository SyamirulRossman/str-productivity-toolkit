// material.imports.ts
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


export const MATERIAL_IMPORTS = [
  CommonModule,

  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  
  MatIcon,

  RouterModule,
  ReactiveFormsModule,
  FormsModule,

  DatePipe,
  AsyncPipe,
  DecimalPipe,

  NgxMatSelectSearchModule,
];
