import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { SliderComponent } from "../slider/slider.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import data from '../../data/data';
import { HttpClientModule } from '@angular/common/http';
import { FormatterService } from '../../services/formatter.service';
import { Song } from '../../interfaces/app.interface';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  imports: [SliderComponent, RouterLink, RouterLinkActive, MatIconModule, FormsModule, HttpClientModule]
})
export class PlayerComponent {
  public pastVolume!: number
  public volume: number = Number(localStorage.getItem('volume'))
  public isShuffled: boolean = false

  constructor(private player: PlayerService, private formatter: FormatterService) { }

  ngOnInit() {
    this.player.setPlaylist(data)
    const lastSongId = localStorage.getItem('lastSongId')
    const prevSongIndex = data.findIndex(el => el.id === lastSongId)
    const index = prevSongIndex === -1 ? 0 : prevSongIndex
    this.player.setCurrentSong(data[index])
    this.player.setVolume(this.volume / 100)
    this.player.getAudio().onended = () => {
      this.player.skipSong('next')
    }
  }

  getTime(): number {
    return this.player.getAudio().duration
  }

  getDurationTime(): string {
    return this.formatter.getTime(this.player.getAudio().duration)
  }

  getFormattedTime(): string {
    return this.formatter.getTime(this.player.getAudio().currentTime)
  }

  initDuration() {
  }

  handleVolume(value: number) {
    this.player.setVolume(value / 100)
    var volumeTimeOut
    clearTimeout(volumeTimeOut)
    volumeTimeOut = setTimeout(() => {
      localStorage.setItem('volume', value.toString())
    }, 500)
  }

  toggleVolume() {
    if (this.player.getAudio().volume > 0) {
      this.pastVolume = this.player.getAudio().volume
      this.volume = 0
      this.player.setVolume(0)
    } else {
      this.player.setVolume(this.pastVolume)
      this.volume = this.pastVolume * 100
    }
  }

  shuffleSongs(array: Song[]): Song[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled
    if (this.isShuffled) {
      const queue = [...this.player.getPlaylist().getValue()]
      this.player.setUnshPlaylist([...queue])
      this.player.setPlaylist(this.shuffleSongs(queue))
    } else {
      this.player.setPlaylist(this.player.getUnshPlaylist())
    }
  }

  toggleRepeat() {
    switch (this.player.getRepeat()) {
      case 'none': this.player.setRepeat('playlist'); break
      case 'playlist': this.player.setRepeat('song'); break
      case 'song': this.player.setRepeat('none'); break
    }
  }

  toggleTrack() {
    if (this.player.getAudio().ended) {
      this.player.setTime(0)
    }

    if (this.player.getAudio().paused) {
      this.player.continueSong()
    } else {
      this.player.pauseSong()
    }
  }

  nextSong() {
    this.player.skipSong('next')
  }

  prevSong() {
    this.player.skipSong('prev')
  }

  getRepeat() {
    return this.player.getRepeat()
  }

  getSong(): Song {
    return this.player.getCurrentSong()
  }

  isSongPause(): boolean {
    return this.player.getAudio().paused
  }

  getSongVolume(): number {
    return this.player.getAudio().volume
  }
}
