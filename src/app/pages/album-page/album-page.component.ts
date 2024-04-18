import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Album, Track } from '../../interfaces/app.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { SongComponent } from '../../components/song/song.component';
import { LoaderComponent } from "../../components/loader/loader.component";
import { PlayButtonComponent } from "../../components/play-button/play-button.component";
import { PlayerService } from '../../services/audio.service';
import { filter } from 'rxjs';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [MatIconModule, RouterLink, SongComponent, CommonModule, LoaderComponent, PlayButtonComponent]
})
export class AlbumPageComponent implements OnInit {
  public playlist!: Album
  public genres!: string
  public isPlaying: boolean = false
  public loading: boolean = false

  constructor(private route: ActivatedRoute, private api: ApiService, private player: PlayerService, private songData: SongService) { }

  ngOnInit() {
    this.player.audioChanges.pipe(filter(el => el.type === 'time')).subscribe(el => {
      this.isPlaying = el.data && this.songData.compareQueues(this.playlist?.tracks?.data ?? [])
    })

    this.route.params.subscribe(params => {
      this.loading = true
      const id = Number(params["id"])
      this.api.getAlbum(id).subscribe(res => {
        this.playlist = res;
        this.isPlaying = !this.player.getAudio().paused && this.songData.compareQueues(this.playlist?.tracks?.data ?? [])
        this.genres = this.playlist.genres?.data.map(el => el.name).join(', ') ?? ''
        this.loading = false
      })
    });
  }

  isLastPlaylist(index: number): boolean {
    return index === this.playlist.contributors.length - 1
  }
}
