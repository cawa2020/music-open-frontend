import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { SongComponent } from '../../shared/components/song/song.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { Album } from '../../shared/interfaces/album.interface';
import { AlbumPageHeaderComponent } from './album-page-header/album-page-header.component';
import { scaleInOut } from '../../shared/animations/scaleInOut';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [
    RouterLink,
    SongComponent,
    CommonModule,
    LoaderComponent,
    AlbumPageHeaderComponent
  ],
  animations: [scaleInOut]
})
export class AlbumPageComponent implements OnInit {
  public album: Album | null = null;
  public isFullCoverOpen = false

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.initAlbum()
  }

  toggleFullCover() {
    this.isFullCoverOpen = !this.isFullCoverOpen
  }

  private initAlbum() {
    this.route.params.subscribe((params) => {
      this.album = null
      const id = Number(params['id']);
      this.api.getAlbum(id).subscribe((res) => this.album = res);
    });
  }
}
