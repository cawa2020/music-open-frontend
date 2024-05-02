import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Song } from '../../shared/interfaces/track.interface';
import { Repeat } from '../../shared/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private queue!: Song[]
  private unshuffledQueue!: Song[]
  private song: Song | null = null
  private repeat: Repeat = 'none'
  private isShuffled: boolean = false
  public readonly changes = new BehaviorSubject<'song' | 'repeat' | 'queue' | 'shuffle' | null>(null)

  getSong(): Song | null {
    return this.song
  }

  setSong(value: Song) {
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

  getUnshQueue(): Song[] {
    return this.unshuffledQueue
  }

  setUnshQueue(newQueue: Song[]) {
    this.unshuffledQueue = newQueue
  }

  getShuffle(): boolean {
    return this.isShuffled
  }

  setShuffle(value: boolean) {
    this.isShuffled = value
    this.changes.next('shuffle')
  }

  setQueue(tracks: Song[]) {
    this.queue = tracks
    this.changes.next('queue')
  }

  getQueue(): Song[] {
    return this.queue
  }

  compareQueues(diffQueue: Song[]): boolean {
    if (!this.queue) return false
    const queue = JSON.parse(JSON.stringify(this.queue))
    const newQueue = JSON.parse(JSON.stringify(diffQueue))
    if (this.isShuffled) {
      newQueue.sort((a: Song, b: Song) => a.id - b.id)
      queue.sort((a: Song, b: Song) => a.id - b.id)
    }

    for (let i = 0; i <= queue.length; i++) {
      if (newQueue[i]?.id !== queue[i]?.id) { return false }
    }

    return true
  }
}
