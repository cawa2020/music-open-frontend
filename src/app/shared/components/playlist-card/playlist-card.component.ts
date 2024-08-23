import { Component, Input } from '@angular/core';
import { Playlist } from '../../interfaces/playlist.interface';
import { Song } from '../../interfaces/song.interface';
import { AudioService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.css'
})
export class PlaylistCardComponent {
  @Input({required: true}) playlist!: Playlist

  constructor(private player: AudioService, private songData: SongService) { }

  playAlbum() {
    const queue: Song[] = this.playlist.songs
    this.songData.setQueue(queue)
    this.player.setSong(queue[0])
    this.player.playSong()
  }
}
