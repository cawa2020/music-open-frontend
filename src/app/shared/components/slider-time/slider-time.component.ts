import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerService } from '../../../core/services/audio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-time',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slider-time.component.html',
  styleUrl: '../slider-time/slider-time.component.css',
})
export class SliderTimeComponent {
  @Input({ required: true }) currentTime: number = 0
  @Input({ required: true }) duration: number = 0
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false

  constructor(private player: PlayerService) { }

  get currentPercentage() {
    const currentPercent = this.currentTime / this.duration * 100
    const percent = Number(this.disableChanging ? this.editableTimeWhenDisable : currentPercent)
    return percent.toFixed(2) + '%'
  }

  handleChange(newValue: any) {
    this.editableTimeWhenDisable = newValue
    localStorage.setItem('currentTime', (newValue * this.duration / 100).toString())
    if (this.disableChanging) return
    this.currentTime = newValue
  }

  changeTime() {
    this.player.setTime(this.editableTimeWhenDisable / 100 * this.duration)
    this.disableChanging = false
  }

  disableTimeChange() {
    this.disableChanging = true
  }
}
