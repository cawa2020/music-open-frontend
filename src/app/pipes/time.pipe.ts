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
    const correctedSeconds = String(seconds).length == 1 ? '0' + seconds : seconds
    if (isNaN(minutes) || isNaN(seconds)) {
      return '0:00'
    }
    return `${minutes}:${correctedSeconds}`
  }

}
