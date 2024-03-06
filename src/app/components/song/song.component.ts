import { Component, Input } from '@angular/core';
import { Album, Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/player.service';
import { FormatterService } from '../../services/formatter.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
  @Input() song!: Track
  @Input() playlist!: Album
  @Input() index!: number
  @Input() hideImg?: boolean
  @Input() hideAlbum?: boolean
  @Input() hideArtist?: boolean

  constructor(private player: PlayerService, private formatter: FormatterService) { }

  isSongPause(): boolean {
    return this.player.getAudio().paused
  }

  setTrack(index: number) {
    if (this.playlist.id !== this.player.getPlaylist()?.getValue()?.id) {
      this.player.setPlaylist(this.playlist)
    }
    const song = this.playlist.tracks.data[index]
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
}
