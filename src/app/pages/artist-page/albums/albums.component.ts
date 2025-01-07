import { Component, computed, inject, input, OnInit } from '@angular/core';
import { AlbumBrief } from '../../../shared/interfaces/album.interface';
import { ApiService } from '../../../core/services/api.service';
import { AlbumCardComponent } from "../../../shared/components/album-card/album-card.component";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { filter, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SortService } from '../../../core/services/sort.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
  imports: [AlbumCardComponent, LoaderComponent, CommonModule]
})
export class AlbumsComponent {
  private api = inject(ApiService)
  private sortService = inject(SortService)
  public id = input<number>()
  public albums = computed(() => {
    const id = this.id()
    if (!id) return of(null)
    return this.api.getArtistAlbums(id).pipe(
      map((res) => this.sortService.sortAlbumByDate(res.data).filter((record: AlbumBrief) => record.record_type == 'album'))
    )
  })
}
