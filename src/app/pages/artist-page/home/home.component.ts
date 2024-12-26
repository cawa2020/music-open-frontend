import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { SongComponent } from "../../../shared/components/song/song.component";
import { map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [LoaderComponent, SongComponent, RouterLink, CommonModule]
})
export class HomeComponent {
  private api = inject(ApiService)
  private router = inject(ActivatedRoute)

  public id$ = input<Observable<number>>()
  public songs$ = computed(() => {
    const id$ = this.id$()
    if (!id$) return []
    return id$.pipe(switchMap(id => this.api.getArtistTop(id, 5)), map((res) => res.data))
  })
}
