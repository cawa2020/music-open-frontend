import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  public duration: number = 0
  public time: number = 0
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false

  constructor(private player: PlayerService) { }

  ngOnInit() {
    const audio = this.player.getAudio()

    if (!isNaN(this.player.getAudio().duration)) {
      this.duration = this.player.getAudio().duration
    }

    this.player.getAudio().addEventListener('canplaythrough', () => {
      this.duration = this.player.getAudio().duration
      if (this.time === undefined) {
        this.time = 0
      } else {
        this.time = audio.currentTime / this.duration * 100
      }
    });

    this.player.getAudio().addEventListener('timeupdate', () => {
      this.time = audio.currentTime / this.duration * 100
    });
  }

  getWidth() {
    return +(this.disableChanging ? this.editableTimeWhenDisable : this.time).toFixed(2)
  }

  handleValueChange(event: any) {
    this.editableTimeWhenDisable = event
    localStorage.setItem('currentTime', (event * this.duration / 100).toString())
    if (this.disableChanging) return
    this.time = event
  }

  changeSongTime() {
    this.player.setTime(this.editableTimeWhenDisable / 100 * this.duration)
    this.disableChanging = false
  }

  disableValueChange() {
    this.disableChanging = true
  }
}
