import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const time = Math.floor(value)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    if (isNaN(minutes) || isNaN(seconds)) { return '- - : - -' }
    const correctedSeconds = String(seconds).length == 1 ? '0' + seconds : seconds
    return `${minutes}:${correctedSeconds}`
  }

}
