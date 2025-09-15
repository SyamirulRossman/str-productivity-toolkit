import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  selector: 'app-uuid-generator',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './uuid-generator.html',
  styleUrl: './uuid-generator.scss'
})
export class UuidGenerator {
  uuid = '';

  private uuidv4(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20)
    ].join('-');
  }

  generate() {
    this.uuid = this.uuidv4();
  }

  async copy() {
    if (!this.uuid) return;
    await navigator.clipboard.writeText(this.uuid);
    alert('Copied: ' + this.uuid);
  };

  openRouteInNewTab(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
}
