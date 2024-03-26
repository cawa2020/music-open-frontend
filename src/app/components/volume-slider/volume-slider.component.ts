import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volume-slider',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './volume-slider.component.html',
  styleUrl: './volume-slider.component.css'
})
export class VolumeSliderComponent {
  @Input() widthClass?: string
  public pastVolume!: number
  public volume: number = Number(localStorage.getItem('volume'))

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.player.setVolume(this.volume / 100)
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
}
