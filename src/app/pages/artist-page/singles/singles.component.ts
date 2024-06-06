import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AlbumBrief } from '../../../shared/interfaces/album.interface';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { AlbumCardComponent } from "../../../shared/components/album-card/album-card.component";

@Component({
  selector: 'app-singles',
  standalone: true,
  templateUrl: './singles.component.html',
  styleUrl: './singles.component.css',
  imports: [LoaderComponent, AlbumCardComponent]
})
export class SinglesComponent {
  public singles: AlbumBrief[] | null = []

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.singles = null
      const artistId = Number(params['id']);
      this.initSingles(artistId)
    });
  }

  private initSingles(artistId: number) {
    this.api.getArtistAlbums(artistId).subscribe((res) => {
      const sortedAlbums = this.sortByDate(res.data)
      this.singles = sortedAlbums.filter(album => album.record_type == 'single' || album.record_type == 'ep');
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
