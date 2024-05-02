import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../core/services/audio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-time',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slider-time.component.html',
  styleUrl: '../slider-time/slider-time.component.css'
})
export class SliderTimeComponent implements OnInit {
  public duration: number = 0
  public time: number = 0
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    const audio = this.player.getAudio()
    this.duration = audio.duration

    audio.addEventListener('loadedmetadata', () => {
      this.duration = audio.duration
    });

    audio.addEventListener('timeupdate', () => {
      this.time = audio.currentTime / this.duration * 100
    });
  }

  handleChange(newValue: any) {
    this.editableTimeWhenDisable = newValue
    localStorage.setItem('currentTime', (newValue * this.duration / 100).toString())
    if (this.disableChanging) return
    this.time = newValue
  }

  get currentPercentage() {
    return +(this.disableChanging ? this.editableTimeWhenDisable : this.time).toFixed(2) + '%'
  }

  changeTime() {
    this.player.setTime(this.editableTimeWhenDisable / 100 * this.duration)
    this.disableChanging = false
  }

  disableTimeChange() {
    this.disableChanging = true
  }
}
