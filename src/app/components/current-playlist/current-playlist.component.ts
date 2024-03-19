import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Album, Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/player.service';
import { RouterLink } from '@angular/router';
import { FormatterService } from '../../services/formatter.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SongComponent } from "../song/song.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-current-playlist',
  standalone: true,
  templateUrl: './current-playlist.component.html',
  styleUrl: './current-playlist.component.css',
  imports: [MatIconModule, RouterLink, DragDropModule, SongComponent]
})
export class CurrentPlaylistComponent {
  @Input() id!: number
  @Input() type!: 'album'
  public playlist!: Album
  public loading: boolean = false

  constructor(private api: ApiService, private player: PlayerService, private formatter: FormatterService) { }

  ngOnChanges() {
    this.loading = true
    if (this.type === 'album') {
      this.api.getAlbum(this.id).subscribe(res => { this.playlist = res; this.loading = false })
    } else {
      this.api.getPlaylist(this.id).subscribe(res => { this.playlist = res; this.loading = false })
    }
  }

  getGenres(): string {
    return this.playlist.genres?.data.map(el => el.name).join(', ') ?? ''
  }

  getTrackWord(): string {
    const num = this.playlist.nb_tracks
    if (num == 1) {
      return 'трек'
    } else if (num >= 2 && num <= 4) {
      return 'трека'
    } else {
      return 'треков'
    }
  }

  isSongPause(): boolean {
    return this.player.getAudio().paused
  }

  setTrack(index: number) {
    const queue = this.player.getQueue()
    if (!queue) return
    const song = queue[index]
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

  getQueue(): Track[] {
    return this.playlist.tracks.data
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }

  isCurrentSong(songId: number): boolean {
    return this.player?.getCurrentSong()?.id === songId
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlist.tracks.data, event.previousIndex, event.currentIndex)
  }
}
