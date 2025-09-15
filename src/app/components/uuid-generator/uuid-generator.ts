import { Component, OnInit, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { v4 as uuidv4 } from 'uuid';
import { uuidv7 } from 'uuidv7';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Versions {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-uuid-generator',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './uuid-generator.html',
  styleUrl: './uuid-generator.scss'
})
export class UuidGenerator implements OnInit {
  constructor(
    private _matSnackBar: MatSnackBar,
    private _fb: FormBuilder,
  ) {
    this.mutilpleUuidForm = this._fb.group({
      version: ['v4', Validators.required],
      count: [1, [Validators.min(1)]],
    });
  }

  uuid = '';

  selectedValue: string = 'v4';

  readonly panelOpenState = signal(false);

  mutilpleUuidForm: FormGroup;
  mutilpleUuidArrays: any[] = [];
  displayedColumns: string[] = ['no', 'id', 'action'];

  versions: Versions[] = [
    {value: 'v4', viewValue: 'Version 4 UUID'},
    {value: 'v7', viewValue: 'Version 7 UUID'},
  ];

  ngOnInit(): void {
    this.generate();
  }

  generate() {
    switch(this.selectedValue) {
      case 'v7':
        this.uuid = uuidv7();; // Placeholder for v7 UUID generation
        break;
      default:
        this.uuid = uuidv4();
    }
  }

  async copy() {
    if (!this.uuid) return;
    await navigator.clipboard.writeText(this.uuid);
    this._matSnackBar.open('Copied: ' + this.uuid, 'Close', { 
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  };

  generateMultiple(){
    console.log(this.mutilpleUuidForm.value);
    this.mutilpleUuidArrays = [];
    for (let i = 0; i < (this.mutilpleUuidForm.value.count || 1); i++) {
      switch(this.mutilpleUuidForm.value.version) {
        case 'v7':
          this.mutilpleUuidArrays.push({
            id: uuidv7(),
            copied: false,
          });
          break;
        default:
          this.mutilpleUuidArrays.push({
            id: uuidv4(),
            copied: false,
          });
      };
    };
  };

  copyOne(element: any) {
    if (!element) return;
    navigator.clipboard.writeText(element.id);
    element.copied = true;
    this._matSnackBar.open('Copied: ' + element.id, 'Close', { 
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  };

  openRouteInNewTab(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
}
