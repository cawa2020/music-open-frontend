import { Injectable, signal } from '@angular/core';
import { Song } from '../../shared/interfaces/song.interface';
import { Repeat } from '../../shared/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private song = signal<Song | null>(null)
  private repeat = signal<Repeat>('none')
  private isShuffled = signal<boolean>(false)
  private queue = signal<Song[]>([])
  private unshuffledQueue: Song[] = []

  getSong(): Song | null {
    return this.song()
  }

  setSong(value: Song): void {
    this.song.set(value)
  }

  getRepeat(): Repeat {
    return this.repeat()
  }

  setRepeat(value: Repeat): void {
    this.repeat.set(value)
  }

  getShuffle(): boolean {
    return this.isShuffled()
  }

  setShuffle(value: boolean) {
    this.isShuffled.set(value)
    if (value) {
      this.unshuffledQueue = this.queue()
      this.setQueue(this.shuffleSongs(this.queue()))
    } else {
      this.setQueue(this.unshuffledQueue)
    }
  }

  setQueue(tracks: Song[]): void {
    this.queue.set(tracks)
  }

  addToQueue(tracks: Song[]): void {
    const queue = this.queue()
    const currentSongIndex = queue.findIndex(song => song.id === this.song()?.id)
    queue.splice(currentSongIndex + 1, 0, ...tracks)
    this.queue.set(queue)
  }

  getQueue(): Song[] {
    return this.queue()
  }

  compareQueues(newQueue: Song[]): boolean {
    if (!this.queue()) return false
    const sortedQueue = JSON.parse(JSON.stringify(this.queue())).sort((a: Song, b: Song) => a.id - b.id)
    const sortedNewQueue = JSON.parse(JSON.stringify(newQueue)).sort((a: Song, b: Song) => a.id - b.id)

    for (let i = 0; i <= sortedQueue.length; i++) {
      if (sortedNewQueue[i]?.id !== sortedQueue[i]?.id) { return false }
    }

    return true
  }

  private shuffleSongs(queue: Song[]): Song[] {
    const arr = JSON.parse(JSON.stringify(queue))

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }
}
