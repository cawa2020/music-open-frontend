import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlayerService } from '../../services/audio.service';
import { volumeMultiplier } from '../../app.constants';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-volume-editor',
    standalone: true,
    templateUrl: './volume-editor.component.html',
    styleUrls: ['./volume-editor.component.css', '../slider-time/slider-time.component.css'],
    imports: [MatIconModule, FormsModule]
})
export class VolumeEditorComponent {
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
    return this.volume >= 50 ? 'volume_up' : this.volume > 0 ? 'volume_down' : 'volume_off'
  }

  getCurrentPercentage() {
    return this.volume + '%'
  }
}
