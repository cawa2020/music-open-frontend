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
import { scaleInOut } from '../../shared/animations/scaleInOut';
import { AlbumPageHeaderComponent } from './components/album-page-header/album-page-header.component';
import { ModalService } from '../../core/services/modal.service';
import { FullCoverComponent } from '../../shared/components/full-cover/full-cover.component';

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

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.initAlbum()
  }

  openFullCover() {
    this.modal.openModal(FullCoverComponent, { img: this.album?.cover_xl })
  }

  private initAlbum() {
    this.route.params.subscribe((params) => {
      this.album = null
      const id = Number(params['id']);
      this.api.getAlbum(id).subscribe((res) => this.album = res);
    });
  }
}
