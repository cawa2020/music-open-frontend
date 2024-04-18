import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
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
import { SkeletonComponent } from "../../components/skeleton/skeleton.component";

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [MatIconModule, RouterLink, SongComponent, CommonModule, LoaderComponent, PlayButtonComponent, SkeletonComponent]
})
export class AlbumPageComponent implements OnInit {
  public playlist!: Album
  public loading: boolean = false
  public genres!: string

  constructor(private route: ActivatedRoute, private api: ApiService) { }

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

  isLastPlaylist(index: number): boolean {
    return index === this.playlist.contributors.length - 1
  }
}
