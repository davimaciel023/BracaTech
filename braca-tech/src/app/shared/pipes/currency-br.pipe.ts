import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'currencyBr', standalone: true }) export class CurrencyBrPipe implements PipeTransform {
  transform(value: number | null | undefined, currency = 'BRL'): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency
    }).format(value || 0)
  }
}
