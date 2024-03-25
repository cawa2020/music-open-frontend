import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Album, AlbumBrief } from '../../interfaces/app.interface';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from "../../components/album/album.component";

@Component({
    selector: 'app-artist-discography',
    standalone: true,
    templateUrl: './artist-discography.component.html',
    styleUrls: ['./artist-discography.component.css', '../artist/artist.component.css'],
    imports: [CommonModule, RouterLink, AlbumComponent]
})
export class ArtistDiscographyComponent implements OnInit {
  public albums$!: Observable<AlbumBrief[] | null>

  constructor(private api: ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const id = Number(params["id"])
      this.albums$ = this.api.getArtistAlbums(id).pipe(map(res => this.sortByDate(res.data)))
    });
  }

  sortByDate(arr: AlbumBrief[]): AlbumBrief[] {
    return arr.sort((a, b) => (new Date(b.release_date) as any) - (new Date(a.release_date) as any))
  }
}
