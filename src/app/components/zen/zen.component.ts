import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { Track } from '../../interfaces/app.interface';
import { MatIconModule } from '@angular/material/icon';
import { FormatterService } from '../../services/formatter.service';
import { SliderComponent } from "../slider/slider.component";
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../controls/controls.component';
import { filter } from 'rxjs';
import { VolumeSliderComponent } from "../volume-slider/volume-slider.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-zen',
  standalone: true,
  templateUrl: './zen.component.html',
  styleUrl: './zen.component.css',
  imports: [MatIconModule, SliderComponent, ControlsComponent, VolumeSliderComponent, RouterLink]
})
export class ZenComponent implements OnInit {
  @Output() emitZenMode = new EventEmitter<boolean>()
  public song: Track | null = null
  public duration!: number

  constructor(private player: PlayerService, private songData: SongService, private formatter: FormatterService) { }

  ngOnInit(): void {
    this.updateSong()

    this.songData.changes.pipe(filter(el => el === 'song')).subscribe(el => {
      this.updateSong()
    })

    this.player.getAudio().onloadedmetadata = () => {
      this.duration = Number(this.player.getAudio().duration.toFixed(1))
    }
  }

  closeZen() {
    this.emitZenMode.emit(false)
  }

  updateSong() {
    const currentSong = this.songData.getSong()
    if (!currentSong) return
    this.song = currentSong
  }
}
