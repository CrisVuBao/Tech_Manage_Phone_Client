import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeStatus'
})

export class PipeStatus implements PipeTransform {
  transform(value: string): string {
    if (value === 'RECEIVED') {
      return 'Đã xong';
    }

    return value;
  }

}
