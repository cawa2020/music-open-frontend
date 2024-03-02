import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/player.service';
import { RouterLink } from '@angular/router';
import { GridTemplateService } from '../../services/grid-template.service';

@Component({
  selector: 'app-current-playlist',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './current-playlist.component.html',
  styleUrl: './current-playlist.component.css'
})
export class CurrentPlaylistComponent {
  public playlist!: Song[]
  public isShort: boolean = false

  constructor(private player: PlayerService, private grid: GridTemplateService) { }

  ngOnInit() {
    this.player.getPlaylist().subscribe((item) => {
      this.playlist = item
    })
  }

  setTrack(index: number) {
    const song = this.player.getPlaylist().getValue()[index]
    this.player.setCurrentSong(song)
    this.player.continueSong()
  }

  getDuration(duration: number): string {
    return this.player.getDurationFormated(duration)
  }

  isCurrentSong(songId: string): boolean {
    return this.player.getCurrentSong().id === songId
  }

  toggleShort() {
    if (this.isShort) {
      this.grid.setMainGrid([[1, 9], [9, 11]])
    } else {
      this.grid.setMainGrid([[1, 11], [11, 11]])
    }

    this.isShort = !this.isShort
  }
}
