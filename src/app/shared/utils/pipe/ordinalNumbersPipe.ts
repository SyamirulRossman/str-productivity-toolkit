import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = value % 100;

    return value + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }
}