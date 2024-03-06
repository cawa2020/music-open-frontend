import { Injectable } from '@angular/core';
import { Album, Repeat, Song, Track } from '../interfaces/app.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playlist$ = new BehaviorSubject<Album | null>(null)
  private unshuffledPlaylist!: Album
  private currentSong!: Track

  private repeat: Repeat = 'none'
  private audio: HTMLAudioElement = new Audio()
  public audioBehavior$ = new BehaviorSubject<HTMLAudioElement>(this.audio)

  constructor() { }

  getRepeat(): Repeat {
    return this.repeat
  }

  setRepeat(newValue: Repeat) {
    this.repeat = newValue
  }

  getUnshPlaylist(): Album {
    return this.unshuffledPlaylist
  }

  setUnshPlaylist(newPlaylist: Album) {
    this.unshuffledPlaylist = newPlaylist
  }

  setPlaylist(album: Album) {
    this.playlist$.next(album)
    localStorage.setItem('lastPlaylistId', String(album.id))
  }

  getPlaylist(): BehaviorSubject<Album | null> {
    return this.playlist$
  }

  setCurrentTime(newTime: number) {
    this.audio.currentTime = newTime
  }

  setCurrentSong(song: Track) {
    this.currentSong = song
    this.audio.src = song.preview
    this.audio.currentTime = 0
    this.audioBehavior$.next(this.audio)
    localStorage.setItem('lastSongId', String(song.id))
  }

  getCurrentSong(): Track {
    return this.currentSong
  }

  skipSong(direction: 'prev' | 'next', isEndedByItself?: boolean) {
    const playlist: Album | null = this.playlist$.getValue()
    const index = this.getIndexOfNextSong(direction, isEndedByItself)
    if (index === null) {
      this.pauseSong()
      return
    }
    if (!playlist) return
    this.setCurrentSong(playlist.tracks.data[index])
    this.continueSong()
  }

  setTime(time: number) {
    this.audio.currentTime = time
    localStorage.setItem('currentTime', time.toString())
  }

  continueSong() {
    this.audio.play();
  }

  getDuration(): number {
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

  private getIndexOfNextSong(direction: 'prev' | 'next', isEndedByItself?: boolean): number | null {
    const playlist = this.playlist$.getValue()
    const index = playlist?.tracks.data.findIndex(el => el.id === this.currentSong.id) ?? 0
    const isLastSong = index === (playlist?.tracks.data.length ?? 9999) - 1
    const isFirstSong = index === 0

    let newIndex
    if (isFirstSong && direction == 'prev') {
      newIndex = index
    } else if ((this.repeat === 'playlist' && isLastSong && direction === 'next') || (isLastSong && direction === 'next' && !isEndedByItself)) {
      newIndex = 0
    } else if (isLastSong && direction === 'next' && isEndedByItself) {
      newIndex = null
    } else if (this.repeat === 'song' && this.audio.duration >= this.audio.currentTime && isEndedByItself) {
      newIndex = index
    } else {
      newIndex = (direction === 'next' ? 1 : -1) + index
    }

    return newIndex
  }
}
