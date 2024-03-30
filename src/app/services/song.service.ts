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
  private songUrl: string | null = null
  private repeat: Repeat = 'none'
  public readonly changes = new BehaviorSubject<'song' | 'repeat' | 'queue' | null>(null)

  getSong(): Track | null {
    return this.song
  }

  setSong(value: Track) {
    this.song = value
    this.changes.next('song')
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

  setQueue(tracks: Track[]) {
    this.changes.next('queue')
    this.queue = tracks
    console.log(this.queue)
    localStorage.setItem('lastPlaylistId', JSON.stringify(tracks))
  }

  getQueue(): Track[] {
    return this.queue
  }
}
