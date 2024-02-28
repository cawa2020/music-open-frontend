import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { SliderComponent } from "./slider/slider.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  imports: [SliderComponent, RouterLink, RouterLinkActive, MatIconModule]
})
export class PlayerComponent {
  public songDuration!: number

  constructor(public player: PlayerService) { }

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

  ngOnInit() {
    this.player.setSongSrc('asdjasd')
    this.player.getAudio().oncanplaythrough = () => {
      this.songDuration = this.player.getAudio().duration
    }
  }

  getTime(): string {
    const time = Math.floor(this.player.getTime().getValue())
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const correctedSeconds = String(seconds).length == 1 ? '0' + seconds : seconds
    return `${minutes}:${correctedSeconds}`
  }
}
