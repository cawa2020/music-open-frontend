import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { SongComponent } from "../../../shared/components/song/song.component";
import { map, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [LoaderComponent, SongComponent, RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private api = inject(ApiService)
  public id = input<number>()
  public songs = computed(() => {
    const id = this.id()
    if (!id) return of(null)
    return this.api.getArtistTop(id, 5).pipe(map((res) => res.data))
  })
}
