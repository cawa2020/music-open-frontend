import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { SliderComponent } from "../slider/slider.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormatterService } from '../../services/formatter.service';
import { Album, Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { ZenComponent } from "../zen/zen.component";
import { of, take } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  providers: [HttpClientModule],
  imports: [SliderComponent, RouterLink, RouterLinkActive, MatIconModule, FormsModule, HttpClientModule, ZenComponent]
})
export class PlayerComponent implements OnInit {
  public zenMode: boolean = false
  public isShuffled: boolean = false
  public pastVolume!: number
  public volume: number = Number(localStorage.getItem('volume'))

  constructor(private player: PlayerService, private formatter: FormatterService, private api: ApiService) { }

  ngOnInit() {
    this.player.setVolume(this.volume / 100)
    this.player.getAudio().onended = () => {
      this.player.skipSong('next', true)
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

  shuffleSongs(queue: Track[]): Track[] {
    const arr = JSON.parse(JSON.stringify(queue))

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled
    if (this.isShuffled) {
      const queue: Track[] | null = this.player.getQueue()
      if (!queue) return
      this.player.setUnshQueue(JSON.parse(JSON.stringify(queue)))
      this.player.setQueue(this.shuffleSongs(queue))
    } else {
      this.player.setQueue(this.player.getUnshQueue())
    }
  }

  toggleRepeat() {
    switch (this.player.getRepeat()) {
      case 'none': this.player.setRepeat('playlist'); break
      case 'playlist': this.player.setRepeat('song'); break
      case 'song': this.player.setRepeat('none'); break
    }
  }

  toggleZenMode(newValue?: boolean) {
    if (this.zenMode) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }

    this.zenMode = newValue != undefined ? newValue : !this.zenMode
  }

  toggleTrack() {
    if (!this.player.getAudio().src.length) return
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
    if (!this.player.getAudio().src.length) return
    this.player.skipSong('next')
  }

  prevSong() {
    if (!this.player.getAudio().src.length) return
    this.player.skipSong('prev')
  }

  getRepeat() {
    return this.player.getRepeat()
  }

  getSong(): Track | undefined {
    return this.player.getCurrentSong()
  }

  isSongPaused(): boolean {
    return this.player.getAudio().paused
  }

  getSongVolume(): number {
    return this.player.getAudio().volume
  }
}
