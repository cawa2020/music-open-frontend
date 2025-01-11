import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(value: number, format: string = 'm:ss'): string {
    const separatingSymbol = format.includes(':') ? ':' : ' '
    const time = Math.floor(value)
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    if (isNaN(minutes) || isNaN(seconds) || isNaN(hours)) { return '- - : - -' }
    return format.split(separatingSymbol).map((letter) => {
      switch (letter) {
        case 'h': return hours
        case 'hh': return this.formatToTwoDigits(hours)
        case 'm': return minutes
        case 'mm': return this.formatToTwoDigits(minutes)
        case 's': return seconds
        case 'ss': return this.formatToTwoDigits(seconds)
        case 'hr': return hours ? `${hours} hr` : null
        case 'min': return `${minutes} min`
        default: return ''
      }
    }).join(separatingSymbol)
  }

  private formatToTwoDigits(value: number) {
    return String(value).length == 1 ? '0' + value : value
  }
}
