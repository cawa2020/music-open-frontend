import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AlbumExtended } from '../../shared/interfaces/album.interface';
import { scaleInOut } from '../../shared/animations/scaleInOut';
import { map, Observable, switchMap, tap } from 'rxjs';
import { SongsCompilationTemplateComponent } from "../../shared/components/songs-compilation-template/songs-compilation-template.component";
import { TimePipe } from "../../shared/pipes/time.pipe";
import { getSongsAmountName } from '../../shared/utils/songs-compilation-utils';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [
    RouterLink,
    CommonModule,
    LoaderComponent,
    SongsCompilationTemplateComponent,
    TimePipe
  ],
  animations: [scaleInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumPageComponent {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  private id$: Observable<number> = this.route.params.pipe(map((params) => params['id']))
  public album$: Observable<AlbumExtended> = this.id$.pipe(
    switchMap((id) => this.apiService.getAlbum(id)),
    map((album) => ({ ...album, songs_amount_name: getSongsAmountName(album.tracks.data) })))
}
