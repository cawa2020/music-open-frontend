import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { volumeMultiplier } from '../../app.constants';
import { SliderTimeComponent } from '../slider-time/slider-time.component';
import { VolumeEditorComponent } from "../volume-editor/volume-editor.component";

@Component({
    selector: 'app-player',
    standalone: true,
    templateUrl: './player.component.html',
    styleUrl: './player.component.css',
    providers: [HttpClientModule],
    imports: [RouterLink, RouterLinkActive, MatIconModule, FormsModule, HttpClientModule, ZenComponent, ControlsComponent, SliderTimeComponent, VolumeEditorComponent]
})
export class PlayerComponent implements OnInit {
  public zenMode: boolean = false
  public song: Track | undefined = undefined
  public formattedDuration: string = '- - : - -'

  public duration: number = 0
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false

  constructor(private player: PlayerService, private songData: SongService, private formatter: FormatterService) { }

  ngOnInit() {
    const audio = this.player.getAudio()

    audio.onloadedmetadata = () => {
      this.duration = Number(audio.duration.toFixed(1))
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

  isLastElement(index: number): boolean {
    return index === (this.song?.contributors?.length ?? 1) - 1
  }
}
