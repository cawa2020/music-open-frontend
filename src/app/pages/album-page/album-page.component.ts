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
import { LoaderComponent } from "../../components/loader/loader.component";
import { PlayButtonComponent } from "../../components/play-button/play-button.component";

@Component({
    selector: 'app-album-page',
    standalone: true,
    templateUrl: './album-page.component.html',
    styleUrl: './album-page.component.css',
    imports: [MatIconModule, RouterLink, SongComponent, CommonModule, LoaderComponent, PlayButtonComponent]
})
export class AlbumPageComponent implements OnInit {
  public playlist!: Album
  public loading: boolean = false
  public genres!: string

  constructor(private songData: SongService, private route: ActivatedRoute, private api: ApiService, private player: PlayerService, private formatter: FormatterService) { }

  ngOnInit() {
    fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb')
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
}
