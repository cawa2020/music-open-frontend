import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from "../../shared/components/album-card/album-card.component";
import { AlbumBrief } from '../../shared/interfaces/album.interface';

@Component({
    selector: 'app-artist-discography',
    standalone: true,
    templateUrl: './artist-discography.component.html',
    styleUrl: './artist-discography.component.css',
    imports: [CommonModule, RouterLink, AlbumCardComponent]
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
