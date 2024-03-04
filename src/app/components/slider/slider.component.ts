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
export class SliderComponent implements OnChanges {
  @Input() duration!: number
  public time!: number
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false

  constructor(private player: PlayerService) { }

  ngOnChanges() {
    this.player.getAudio().oncanplaythrough = () => {
      this.duration = this.player.getAudio().duration
      if (this.time === undefined) {
        // const currentTime = Number(localStorage.getItem('currentTime'))
        // this.time = currentTime / this.duration * 100
        this.time = 0
        this.player.setCurrentTime(0)
      } else {
        this.time = this.player.getAudio().currentTime / this.duration * 100
      }
    }

    this.player.audioBehavior$.subscribe((audio) => {
      audio.ontimeupdate = (() => {
        this.time = (audio.currentTime / this.duration * 100)
        localStorage.setItem('currentTime', audio.currentTime.toString())
      })
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
