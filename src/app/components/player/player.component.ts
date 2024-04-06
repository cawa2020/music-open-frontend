import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormatterService } from '../../services/formatter.service';
import { Album, Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { ZenComponent } from "../zen/zen.component";
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../controls/controls.component';
import { filter } from 'rxjs';
import { SliderComponent } from '../slider/slider.component';
import { VolumeSliderComponent } from "../volume-slider/volume-slider.component";

@Component({
    selector: 'app-player',
    standalone: true,
    templateUrl: './player.component.html',
    styleUrl: './player.component.css',
    providers: [HttpClientModule],
    imports: [RouterLink, RouterLinkActive, MatIconModule, FormsModule, HttpClientModule, ZenComponent, ControlsComponent, SliderComponent, VolumeSliderComponent]
})
export class PlayerComponent implements OnInit {
  public zenMode: boolean = false
  public song: Track | undefined = undefined
  public duration!: number
  public formattedDuration: string = '- - : - -'

  constructor(private player: PlayerService, private songData: SongService, private formatter: FormatterService, private api: ApiService) { }

  ngOnInit() {
    this.player.getAudio().onloadedmetadata = () => {
      this.duration = Number(this.player.getAudio().duration.toFixed(1))
      this.formattedDuration = this.formatter.getTime(this.duration)
    }

    this.songData.changes.pipe(filter(el => el === 'song')).subscribe(el => {
      const currentSong = this.songData.getSong()
      if (!currentSong) return
      this.song = currentSong
    })
  }

  getFormattedTime(): string {
    if (!this.player.getAudio().src.length) return '- - : - -'
    return this.formatter.getTime(this.player.getAudio().currentTime)
  }

  toggleZenMode(newValue?: boolean) {
    if (!this.player.getAudio().src.length) return

    this.zenMode = newValue != undefined ? newValue : !this.zenMode
  }
}
