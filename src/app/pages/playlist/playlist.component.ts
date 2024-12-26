import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { SongComponent } from "../../shared/components/song/song.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, SongComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  private id$ = this.activateRoute.params.pipe(map((params: any) => params['id']));
  public playlist$ = this.id$.pipe<Playlist>(switchMap(id => this.api.getPlaylist(+id)))

  constructor(private activateRoute: ActivatedRoute, private api: ApiService) { }
}
