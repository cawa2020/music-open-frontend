import { Component, computed, inject, input } from '@angular/core';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { ArtistComponent } from "../../../shared/components/artist-card/artist-card.component";
import { ApiService } from '../../../core/services/api.service';
import { of, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-related',
  standalone: true,
  templateUrl: './related.component.html',
  styleUrl: './related.component.css',
  imports: [LoaderComponent, ArtistComponent, CommonModule]
})
export class RelatedComponent {
  private api = inject(ApiService)
  public id = input<number>()
  public related = computed(() => {
    const id = this.id()
    if (!id) return of(null)
    return this.api.getArtistRelated(id).pipe(map((res) => res.data),)
  })
}
