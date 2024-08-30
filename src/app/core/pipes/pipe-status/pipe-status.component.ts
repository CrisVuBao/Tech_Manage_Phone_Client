import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipestas'
})

export class PipeStatus implements PipeTransform {
  transform(value: unknown): any {
    if (value === 'RECEIVED') {
      return 'Đã xong';
    }

    return value;
  }

}
