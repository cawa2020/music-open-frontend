import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { Artist } from '../../shared/interfaces/artist.interface';
import { Song } from '../../shared/interfaces/song.interface';
import { ArtistPageHeaderComponent } from './artist-page-header/artist-page-header.component';
import { ArtistPageTabsComponent } from './artist-page-tabs/artist-page-tabs.component';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.css',
  imports: [
    LoaderComponent,
    ArtistPageTabsComponent,
    ArtistPageHeaderComponent,
    CommonModule
  ],
})
export class ArtistPageComponent {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  public id$: Observable<number> = this.route.params.pipe(map((params) => params['id']));
  public artist$: Observable<Artist | null> = this.id$.pipe(switchMap((id) => this.apiService.getArtist(id)),);
  public songs$: Observable<Song[]> = this.id$.pipe(switchMap((id) => this.apiService.getArtistTop(id, 5)), map((res) => res.data));
}
