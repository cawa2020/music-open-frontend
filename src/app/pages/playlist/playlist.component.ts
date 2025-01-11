import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { ExtendedPlaylist, Playlist } from '../../shared/interfaces/playlist.interface';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { SongsCompilationTemplateComponent } from "../../shared/components/songs-compilation-template/songs-compilation-template.component";
import { TimePipe } from "../../shared/pipes/time.pipe";
import { getDuration, getSongsAmountName } from '../../shared/utils/songs-compilation-utils';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent, SongsCompilationTemplateComponent, TimePipe],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../album-page/album-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  private id$ = this.route.params.pipe(map((params: any) => +params['id']));
  public playlist$: Observable<ExtendedPlaylist> = this.id$.pipe(
    switchMap(id => this.apiService.getPlaylist(id)),
    map(playlist => ({
      ...playlist,
      songs_amount_name: getSongsAmountName(playlist.songs),
      duration: getDuration(playlist.songs),
    })),
  )
}
