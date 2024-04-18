import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { Track } from '../../interfaces/app.interface';
import { MatIconModule } from '@angular/material/icon';
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../controls/controls.component';
import { filter } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SliderTimeComponent } from "../slider-time/slider-time.component";
import { VolumeEditorComponent } from "../volume-editor/volume-editor.component";

@Component({
    selector: 'app-zen',
    standalone: true,
    templateUrl: './zen.component.html',
    styleUrl: './zen.component.css',
    imports: [MatIconModule, ControlsComponent, RouterLink, SliderTimeComponent, VolumeEditorComponent]
})
export class ZenComponent implements OnInit {
  @Output() toggleZenMode = new EventEmitter<boolean>()
  public song: Track | null = null
  public duration!: number

  constructor(private player: PlayerService, private songData: SongService) { }

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
    this.toggleZenMode.emit(false)
  }

  updateSong() {
    const currentSong = this.songData.getSong()
    if (!currentSong) return
    this.song = currentSong
  }
}
