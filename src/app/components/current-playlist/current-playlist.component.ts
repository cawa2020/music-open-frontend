import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Song, Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/player.service';
import { RouterLink } from '@angular/router';
import { GridTemplateService } from '../../services/grid-template.service';
import { FormatterService } from '../../services/formatter.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-current-playlist',
  standalone: true,
  imports: [MatIconModule, RouterLink, DragDropModule],
  templateUrl: './current-playlist.component.html',
  styleUrl: './current-playlist.component.css'
})
export class CurrentPlaylistComponent implements OnInit {
  public playlist!: Track[]
  public isShort: boolean = false

  constructor(private player: PlayerService, private grid: GridTemplateService, private formatter: FormatterService) { }

  async ngOnInit() {
    this.player.getPlaylist().subscribe((item) => {
      this.playlist = item?.tracks.data ?? []
    })
    setTimeout(() => {
      if (localStorage.getItem('isShort') === 'true') {
        this.toggleShort()
      }
    }, 0)
  }

  isSongPause(): boolean {
    return this.player.getAudio().paused
  }

  setTrack(index: number) {
    const playlist = this.player.getPlaylist().getValue()
    if (!playlist) return
    const song = playlist.tracks.data[index]
    console.log(song.id)
    if (song.id === this.player.getCurrentSong()?.id) {
      if (this.player.getAudio().paused) {
        this.player.continueSong()
      } else {
        this.player.pauseSong()
      }
    } else {
      this.player.setCurrentSong(song)
      this.player.continueSong()
    }
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }

  isCurrentSong(songId: number): boolean {
    return this.player?.getCurrentSong()?.id === songId
  }

  toggleShort() {
    if (this.isShort) {
      this.grid.setMainGrid([[1, 4], [4, 16], [16, 19]])
    } else {
      this.grid.setMainGrid([[1, 4], [4, 18], [18, 19]])
    }

    this.isShort = !this.isShort
    localStorage.setItem('isShort', String(this.isShort))
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlist, event.previousIndex, event.currentIndex)
  }
}
