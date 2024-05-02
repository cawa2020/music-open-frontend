import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { MatIconModule } from '@angular/material/icon';
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../../../shared/components/controls/controls.component';
import { filter } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SliderTimeComponent } from "../../../shared/components/slider-time/slider-time.component";
import { VolumeEditorComponent } from "../../../shared/components/volume-editor/volume-editor.component";
import { Song } from '../../../shared/interfaces/track.interface';

@Component({
    selector: 'app-zen',
    standalone: true,
    templateUrl: './zen.component.html',
    styleUrl: './zen.component.css',
    imports: [MatIconModule, ControlsComponent, RouterLink, SliderTimeComponent, VolumeEditorComponent]
})
export class ZenComponent implements OnInit {
  @Output() toggleZenMode = new EventEmitter<boolean>()
  public song: Song | null = null
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
