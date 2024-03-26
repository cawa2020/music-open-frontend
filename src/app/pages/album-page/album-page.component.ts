import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Album, Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/audio.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormatterService } from '../../services/formatter.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { SongComponent } from '../../components/song/song.component';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [MatIconModule, RouterLink, SongComponent, CommonModule]
})
export class AlbumPageComponent implements OnInit {
  public playlist!: Album
  public loading: boolean = false
  public genres!: string

  constructor(private songData: SongService, private route: ActivatedRoute, private api: ApiService, private player: PlayerService, private formatter: FormatterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loading = true
      const id = Number(params["id"])
      this.api.getAlbum(id).subscribe(res => {
        this.playlist = res;
        this.genres = this.playlist.genres?.data.map(el => el.name).join(', ') ?? ''
        this.loading = false
      })
    });
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
    const queue = this.songData.getQueue()
    if (!queue) return
    const song = queue[index]
    // if (song.id === this.player.getCurrentSong()?.getValue()?.id) {
    //   if (this.player.getAudio().paused) {
    //     this.player.continueSong()
    //   } else {
    //     this.player.pauseSong()
    //   }
    // } else {
    //   this.player.setCurrentSong(song)
    //   this.player.continueSong()
    // }
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }

  // isCurrentSong(songId: number): boolean {
  //   console.log(1)
  //   return this.player?.getCurrentSong()?.getValue()?.id === songId
  // }
}
