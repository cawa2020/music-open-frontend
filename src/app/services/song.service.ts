import { Injectable } from '@angular/core';
import { Album, Repeat, Song, Track } from '../interfaces/app.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private queue!: Track[]
  private unshuffledQueue!: Track[]
  private song: Track | null = null
  private repeat: Repeat = 'none'
  private isShuffled: boolean = false
  public readonly changes = new BehaviorSubject<'song' | 'repeat' | 'queue' | 'shuffle' | null>(null)

  getSong(): Track | null {
    return this.song
  }

  setSong(value: Track) {
    this.song = value
    this.changes.next('song')
    console.log(this.song)
  }

  getRepeat(): Repeat {
    return this.repeat
  }

  setRepeat(value: Repeat) {
    this.repeat = value
    this.changes.next('repeat')
  }

  getUnshQueue(): Track[] {
    return this.unshuffledQueue
  }

  setUnshQueue(newQueue: Track[]) {
    this.unshuffledQueue = newQueue
  }

  getShuffle(): boolean {
    return this.isShuffled
  }

  setShuffle(value: boolean) {
    this.isShuffled = value
    this.changes.next('shuffle')
  }

  setQueue(tracks: Track[]) {
    this.changes.next('queue')
    this.queue = tracks
    localStorage.setItem('lastPlaylistId', JSON.stringify(tracks))
  }

  getQueue(): Track[] {
    return this.queue
  }
}
