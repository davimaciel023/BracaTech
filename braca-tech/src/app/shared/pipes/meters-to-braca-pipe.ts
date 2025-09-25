import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToBraca'
})
export class MetersToBracaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
