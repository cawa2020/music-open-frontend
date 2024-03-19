import { Injectable } from '@angular/core';
import { Album, Repeat, Song, Track } from '../interfaces/app.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private queue!: Track[]
  private unshuffledQueue!: Track[]
  private currentSong!: Track
  private repeat: Repeat = 'none'
  private audio: HTMLAudioElement = new Audio()

  getAudio(): HTMLAudioElement {
    return this.audio
  }

  getRepeat(): Repeat {
    return this.repeat
  }

  setRepeat(newValue: Repeat) {
    this.repeat = newValue
  }

  getUnshQueue(): Track[] {
    return this.unshuffledQueue
  }

  setUnshQueue(newQueue: Track[]) {
    this.unshuffledQueue = newQueue
  }

  setQueue(tracks: Track[]) {
    this.queue = tracks
    localStorage.setItem('lastPlaylistId', JSON.stringify(tracks))
  }

  getQueue(): Track[] {
    return this.queue
  }

  setCurrentTime(newTime: number) {
    this.audio.currentTime = newTime
  }

  setCurrentSong(song: Track) {
    this.currentSong = song
    this.audio.src = song.preview
    this.audio.currentTime = 0
    localStorage.setItem('lastSongId', String(song.id))
  }

  getCurrentSong(): Track {
    return this.currentSong
  }

  setSongSrc(src: string) {
    this.audio.src = src
  }

  setVolume(value: number) {
    this.audio.volume = value * 0.5
  }

  setTime(time: number) {
    this.audio.currentTime = time
    localStorage.setItem('currentTime', time.toString())
  }

  getDuration(): number {
    return this.audio.duration
  }

  continueSong() {
    this.audio.play();
  }

  pauseSong() {
    this.audio.pause()
  }

  skipSong(direction: 'prev' | 'next', isEndedByItself?: boolean) {
    const queue: Track[] | null = this.queue
    const index = this.getIndexOfNextSong(direction, isEndedByItself)
    if (index === null) {
      this.pauseSong()
      return
    }
    if (!queue) return
    this.setCurrentSong(queue[index])
    this.continueSong()
  }

  private getIndexOfNextSong(direction: 'prev' | 'next', isEndedByItself?: boolean): number | null {
    const queue = this.queue
    const index = queue.findIndex(el => el.id === this.currentSong.id) ?? 0
    const isLastSong = index === (queue.length ?? 9999) - 1
    const isFirstSong = index === 0

    let newIndex
    if (isFirstSong && direction == 'prev') {
      newIndex = index
    } else if ((this.repeat === 'playlist' && isLastSong && direction === 'next') || (isLastSong && direction === 'next' && !isEndedByItself)) {
      newIndex = 0
    } else if (this.repeat === 'song' && this.audio.duration >= this.audio.currentTime && isEndedByItself) {
      newIndex = index
    } else if (isLastSong && direction === 'next' && isEndedByItself) {
      newIndex = null
    } else {
      newIndex = (direction === 'next' ? 1 : -1) + index
    }

    return newIndex
  }
}
