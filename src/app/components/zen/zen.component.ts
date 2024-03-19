import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Track } from '../../interfaces/app.interface';
import { MatIconModule } from '@angular/material/icon';
import { FormatterService } from '../../services/formatter.service';
import { SliderComponent } from "../slider/slider.component";

@Component({
    selector: 'app-zen',
    standalone: true,
    templateUrl: './zen.component.html',
    styleUrl: './zen.component.css',
    imports: [MatIconModule, SliderComponent]
})
export class ZenComponent {
  @Output() emitZenMode = new EventEmitter<boolean>()
  public pastVolume!: number
  public volume: number = Number(localStorage.getItem('volume'))
  public isShuffled: boolean = false

  constructor(private player: PlayerService, private formatter: FormatterService) { }

  getSong() {
    return this.player.getCurrentSong()
  }

  getRepeat() {
    return this.player.getRepeat()
  }

  toggleRepeat() {
    switch (this.player.getRepeat()) {
      case 'none': this.player.setRepeat('playlist'); break
      case 'playlist': this.player.setRepeat('song'); break
      case 'song': this.player.setRepeat('none'); break
    }
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

  shuffleSongs(queue: Track[]): Track[] {
    const arr = JSON.parse(JSON.stringify(queue))

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
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

  isSongPaused(): boolean {
    return this.player.getAudio().paused
  }

  closeZen() {
    this.emitZenMode.emit(false)
  }
}
