import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlayerService } from '../../../core/services/audio.service';
import { FormsModule } from '@angular/forms';
import { volumeMultiplier } from '../../constants/constants';

@Component({
  selector: 'app-volume-editor',
  standalone: true,
  templateUrl: './volume-editor.component.html',
  styleUrls: ['./volume-editor.component.css', '../slider-time/slider-time.component.css'],
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VolumeEditorComponent implements OnInit {
  @Input() sliderWidth: string = '100%'
  public pastVolume: number = 0
  public volume: number = Number(localStorage.getItem('volume'))

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    this.player.setVolume(this.volume / 100)
  }

  handleVolume(value: number) {
    this.volume = value
    this.player.setVolume(value / 100)
    var volumeTimeOut
    clearTimeout(volumeTimeOut)
    volumeTimeOut = setTimeout(() => {
      localStorage.setItem('volume', value.toString())
    }, 500)
  }

  toggleVolume() {
    if (this.player.getAudio().volume > 0) {
      this.pastVolume = this.player.getAudio().volume / volumeMultiplier
      this.volume = 0
      this.player.setVolume(0)
    } else {
      this.player.setVolume(this.pastVolume)
      this.volume = this.pastVolume * 100
    }
  }

  getVolumeIcon(): string {
    let icon

    if (this.volume >= 60) {
      icon = 'volume-high'
    } else if (this.volume >= 30) {
      icon = 'volume-medium'
    } else if (this.volume > 0) {
      icon = 'volume-low'
    } else {
      icon = 'volume-mute'
    }

    return icon
  }

  getCurrentPercentage() {
    return this.volume + '%'
  }
}
