import { Component, computed, inject, input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { AlbumCardComponent } from "../../../shared/components/album-card/album-card.component";
import { of, map } from 'rxjs';
import { SortService } from '../../../core/services/sort.service';
import { AlbumBrief } from '../../../shared/interfaces/album.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singles',
  standalone: true,
  templateUrl: './singles.component.html',
  styleUrl: './singles.component.css',
  imports: [LoaderComponent, AlbumCardComponent, CommonModule]
})
export class SinglesComponent {
  private api = inject(ApiService)
  private sortService = inject(SortService)
  public id = input<number>()
  public singles = computed(() => {
    const id = this.id()
    if (!id) return of(null)
    return this.api.getArtistAlbums(id).pipe(
      map((res) => this.sortService.sortAlbumByDate(res.data).filter((record: AlbumBrief) => record.record_type == 'single' || record.record_type == 'ep')),
    )
  })
}
