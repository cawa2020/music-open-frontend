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
  public audioBehavior$ = new BehaviorSubject<HTMLAudioElement>(this.audio)
  private repeat: Repeat = 'none'

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

  setCurrentTime(newTime: number) {
    this.audio.currentTime = newTime
  }

  setCurrentSong(song: Song) {
    this.currentSong = song
    this.audio.src = song.songSource
    this.audio.currentTime = 0
    this.audioBehavior$.next(this.audio)
    localStorage.setItem('lastSongId', song.id)
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
    this.audio.currentTime = time
    localStorage.setItem('currentTime', time.toString())
  }

  continueSong() {
    this.audio.play();
  }

  getDuration(): number  {
    return this.audio.duration
  }

  pauseSong() {
    this.audio.pause()
  }

  getAudio(): HTMLAudioElement {
    return this.audio
  }

  setSongSrc(src: string) {
    this.audio.src = src
  }

  setVolume(value: number) {
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
      newIndex = 0
    } else if (this.repeat === 'song' && this.audio.duration === this.audio.currentTime) {
      newIndex = index
    } else {
      newIndex = (direction === 'next' ? 1 : -1) + index
    }

    return newIndex
  }
}
