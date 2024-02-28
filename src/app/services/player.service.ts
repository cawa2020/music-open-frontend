import { Injectable } from '@angular/core';
import { Song } from '../app.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playlist!: Song[]
  private currentSong!: Song

  private currentTime$ = new BehaviorSubject<number>(0)
  private audio: HTMLAudioElement = new Audio()
  private timeInterval!: any

  constructor() { }

  setTime(time: number) {
    this.currentTime$.next(time)
    this.audio.currentTime = time
  }

  getTime(): BehaviorSubject<number> {
    return this.currentTime$
  }

  continueSong() {
    this.audio.load();
    this.audio.play();
    this.audio.currentTime = this.currentTime$.getValue()
    this.timeInterval = setInterval(() => {
      if (this.currentTime$.getValue() >= this.audio.duration) {
        this.pauseSong()
      } else {
        this.currentTime$.next(this.currentTime$.getValue() + 0.2)
      }
    }, 200)
  }

  pauseSong() {
    this.audio.pause()
    clearInterval(this.timeInterval)
  }

  getAudio(): HTMLAudioElement {
    return this.audio
  }

  setSongSrc(src: string) {
    this.audio.src = '../../../../assets/audio/kishlak-eskapist.mp3'
  }

  changeVolume(value: number) {
    this.audio.volume = value
  }
}
