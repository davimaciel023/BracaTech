import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'metersToBraca', standalone: true }) export class MetersToBracaPipe implements PipeTransform {
  transform(meters: number, bracaM = 2.2, digits = 2): string {
    if (!meters) return '0'
    const v = meters / bracaM
    return v.toFixed(digits)
  }
}
