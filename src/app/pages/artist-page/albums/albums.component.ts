import { Component, inject, OnInit } from '@angular/core';
import { AlbumBrief } from '../../../shared/interfaces/album.interface';
import { ApiService } from '../../../core/services/api.service';
import { AlbumCardComponent } from "../../../shared/components/album-card/album-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { filter, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-albums',
  standalone: true,
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
  imports: [AlbumCardComponent, LoaderComponent, CommonModule]
})
export class AlbumsComponent {
  private api = inject(ApiService)
  private router = inject(ActivatedRoute)

  private id$ = this.router.params.pipe(map(params => params['id']));
  public albums$ = this.id$.pipe(
    switchMap(id => this.api.getArtistAlbums(id)),
    map(res => this.sortByDate(res.data),
      filter((record: any) => record.record_type == 'album'))
  );


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
