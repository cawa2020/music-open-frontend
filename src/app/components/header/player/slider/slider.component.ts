import { Component, Input, Output } from '@angular/core';
import { PlayerService } from '../../../../services/player.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() duration!: number
  public time: number = 0
  public editableTimeWhenDisable: number = 0 // При изменении времени мы хотим его менять только при mouseup event
  public disableChanging: boolean = false

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.player.getTime().subscribe(time => {
      if (this.disableChanging) return
      this.time = +(time / (isNaN(this.duration) ? 1 : this.duration) * 100).toFixed(3)
    })
  }

  handleValueChange(event: any) {
    this.editableTimeWhenDisable = event
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
