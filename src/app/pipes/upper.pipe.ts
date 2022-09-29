import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper'
})
export class UpperPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let values: string[] = value.split(' ');
    let result = '';

    for (let v of values) {
      result += this.captalize(v) + ' ';
    }

    return result;
  }

  captalize(value: string) {
    return value.substring(0, 1).toLocaleUpperCase() + value.substring(1).toLowerCase();
  }
}
