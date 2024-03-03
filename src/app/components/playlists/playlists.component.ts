import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Playlist } from '../../interfaces/app.interface';
import { FormatterService } from '../../services/formatter.service';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})

export class PlaylistsComponent implements OnInit {
  public playlists: Playlist[] = []
  private albumsId: number[] = [450224025, 511084131, 175718342, 175719552, 249099]

  constructor (private api: ApiService, private formatter: FormatterService, private player: PlayerService) {}

  ngOnInit(): void {
    this.albumsId.map(id => {
      this.api.getAlbum(id).subscribe(res => {
        this.playlists.push(res)
      })
    })

  }

  getTime(duration: number): string {
    return this.formatter.getTime(duration)
  }

  setPlaylist(playlist: Playlist) {
    if (this.player.getPlaylist().getValue()?.id === playlist.id) {
      if (this.player.getAudio().paused) {
        this.player.continueSong()
      } else {
        this.player.pauseSong()
      }
    } else {
      this.player.setPlaylist(playlist)
      // const lastSongId = localStorage.getItem('lastSongId')
      // const prevSongIndex = list.findIndex(el => el.id === Number(lastSongId))
      // const index = prevSongIndex === -1 ? 0 : prevSongIndex
      // this.player.setCurrentSong(list[0])
      this.player.setVolume(Number(localStorage.getItem('volume')) / 100)
      // this.player.continueSong()
    }
  }
}
