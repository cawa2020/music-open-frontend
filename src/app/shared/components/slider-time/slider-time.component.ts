import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { FormsModule } from '@angular/forms';
import { TimePipe } from "../../pipes/time.pipe";

@Component({
  selector: 'app-slider-time',
  standalone: true,
  templateUrl: './slider-time.component.html',
  styleUrl: '../slider-time/slider-time.component.css',
  imports: [FormsModule, TimePipe]
})
export class SliderTimeComponent implements OnInit {
  public duration: number = 0
  public currentTime: number = 0
  public editableTimeWhenDisable: number = 0
  public changingDisable: boolean = false

  get currentPercentage() {
    if (this.changingDisable) {
      return this.editableTimeWhenDisable.toFixed(2) + '%'
    }
    const currentPercent = this.currentTime / this.duration * 100
    return currentPercent.toFixed(2) + '%'
  }

  constructor(private player: AudioService, private audioService: AudioService) { }

  ngOnInit(): void {
    const audio = this.audioService.getAudio()

    audio.addEventListener('canplaythrough', () => {
      this.duration = Number(audio.duration.toFixed(1))
    })

    audio.addEventListener('timeupdate', () => { this.currentTime = this.audioService.getAudio().currentTime })
  }

  disableTimeChange() {
    this.changingDisable = true
  }

  handleChange(newValue: number) {
    this.editableTimeWhenDisable = newValue
    // const timeSeconds = newValue * this.duration / 100
    // if (this.changingDisable) return
    // localStorage.setItem('currentTime', timeSeconds.toString())
  }

  changeTime() {
    const newTime = this.editableTimeWhenDisable / 100 * this.duration
    this.player.setTime(newTime)
    this.currentTime = newTime
    this.changingDisable = false
  }
}
