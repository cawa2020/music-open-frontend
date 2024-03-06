import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Album } from '../../interfaces/app.interface';
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
  @Input() type!: string
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

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlist.tracks.data, event.previousIndex, event.currentIndex)
  }
}
