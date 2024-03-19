import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  @Input() duration!: number
  public time!: number
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false
  public loaderWidth: number = 0

  constructor(private player: PlayerService) { }

  ngOnInit() {
    const audio = this.player.getAudio()

    audio.oncanplaythrough = () => {
      if (this.time === undefined) {
        this.time = 0
      } else {
        this.time = audio.currentTime / this.duration * 100
      }
    }

    audio.ontimeupdate = (() => {
      this.time = (audio.currentTime / this.duration * 100)
      this.loaderWidth = +(this.disableChanging ? this.editableTimeWhenDisable : this.time).toFixed(2)
      localStorage.setItem('currentTime', audio.currentTime.toString())
    })
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
