import { Injectable } from '@angular/core';
import { Repeat, Song } from '../interfaces/app.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playlist$ = new BehaviorSubject<Song[]>([])
  private unshuffledPlaylist!: Song[]
  private currentSong!: Song

  private audio: HTMLAudioElement = new Audio()
  private volume = new BehaviorSubject<number>(Number(localStorage.getItem('volume')) / 100)
  private repeat: Repeat = 'none'
  private currentTime$ = new BehaviorSubject<number>(0)
  private timeInterval!: any

  constructor() { }

  getRepeat(): Repeat {
    return this.repeat
  }

  setRepeat(newValue: Repeat) {
    this.repeat = newValue
  }

  getUnshPlaylist(): Song[] {
    return this.unshuffledPlaylist
  }

  setUnshPlaylist(newPlaylist: Song[]) {
    this.unshuffledPlaylist = newPlaylist
  }

  setPlaylist(value: Song[]) {
    this.playlist$.next(value)
  }

  getPlaylist(): BehaviorSubject<Song[]> {
    return this.playlist$
  }

  setCurrentSong(song: Song) {
    clearInterval(this.timeInterval)
    this.currentSong = song
    this.audio.src = song.songSource
    this.audio.volume = this.volume.getValue()
    this.currentTime$.next(0)
  }

  getCurrentSong(): Song {
    return this.currentSong
  }

  skipSong(direction: 'prev' | 'next') {
    const playlist = this.playlist$.getValue()
    const index = this.getIndexOfNextSong(direction)
    if (index === null) {
      this.pauseSong()
      return
    }
    this.setCurrentSong(playlist[index])
    this.continueSong()
  }

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
      this.currentTime$.next(this.currentTime$.getValue() + 0.2)
    }, 200)
  }

  getDurationFormated(duration: number): string {
    const time = Math.floor(duration)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const correctedSeconds = String(seconds).length == 1 ? '0' + seconds : seconds
    return `${minutes}:${correctedSeconds}`
  }

  pauseSong() {
    this.audio.pause()
    clearInterval(this.timeInterval)
  }

  getAudio(): HTMLAudioElement {
    return this.audio
  }

  setSongSrc(src: string) {
    this.audio.src = src
  }

  changeVolume(value: number) {
    this.volume.next(value)
    this.audio.volume = value
  }

  private getIndexOfNextSong(direction: 'prev' | 'next'): number | null {
    const playlist = this.playlist$.getValue()
    const index = playlist.findIndex(el => el.id === this.currentSong.id)
    const isLastSong = index === playlist.length - 1
    const isFirstSong = index === 0

    let newIndex
    if (isFirstSong && direction == 'prev') {
      newIndex = index
    } else if (this.repeat === 'playlist' && isLastSong && direction === 'next') {
      newIndex = 0
    } else if (isLastSong && direction === 'next') {
      newIndex = null
    } else if (this.repeat === 'song' && this.audio.duration === this.audio.currentTime) {
      newIndex = index
    } else {
      newIndex = (direction === 'next' ? 1 : -1) + index
    }

    return newIndex
  }
}
