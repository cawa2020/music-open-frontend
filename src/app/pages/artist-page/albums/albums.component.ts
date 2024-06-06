import { Component, OnInit } from '@angular/core';
import { AlbumBrief } from '../../../shared/interfaces/album.interface';
import { ApiService } from '../../../core/services/api.service';
import { AlbumCardComponent } from "../../../shared/components/album-card/album-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";

@Component({
    selector: 'app-albums',
    standalone: true,
    templateUrl: './albums.component.html',
    styleUrl: './albums.component.css',
    imports: [AlbumCardComponent, LoaderComponent]
})
export class AlbumsComponent implements OnInit {
  public albums: AlbumBrief[] | null = null

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.albums = null
      const artistId = Number(params['id']);
      this.initAlbums(artistId)
    });
  }

  private initAlbums(artistId: number) {
    this.api.getArtistAlbums(artistId).subscribe((res) => {
      const sortedAlbums = this.sortByDate(res.data)
      this.albums = sortedAlbums.filter(album => album.record_type == 'album');
    })
  }

  private sortByDate(arr: AlbumBrief[]): AlbumBrief[] {
    return arr.sort((a, b) => {
      const date1 = new Date(a.release_date);
      const date2 = new Date(b.release_date);
      if (date1 > date2) return -1;
      else if (date1 < date2) return 1;
      else return 0;
    });
  }
}
