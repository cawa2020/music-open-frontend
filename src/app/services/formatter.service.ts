import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  getTime(num: number): string {
    const time = Math.floor(num)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const correctedSeconds = String(seconds).length == 1 ? '0' + seconds : seconds
    return `${minutes}:${correctedSeconds}`
  }
}
