import {
  Component,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { SongComponent } from '../../shared/components/song/song.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PlayButtonComponent } from '../../shared/components/play-button/play-button.component';
import { AudioService } from '../../core/services/audio.service';
import { filter } from 'rxjs';
import { SongService } from '../../core/services/song.service';
import { Album } from '../../shared/interfaces/album.interface';
import { CookieService } from '../../core/services/cookie.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [
    MatIconModule,
    RouterLink,
    SongComponent,
    CommonModule,
    LoaderComponent,
    PlayButtonComponent,
  ]
})
export class AlbumPageComponent implements OnInit {
  public album!: Album;
  public isPlaying: boolean = false;
  public loading: boolean = false;
  public isFavorite: boolean = false;
  public isFavoriteLoading: boolean = false;

  get genres(): string {
    return this.album.genres?.data.map((el) => el.name).join(', ') ?? '';
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private audio: AudioService,
    private songData: SongService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.audio.audioChanges
      .pipe(filter((el) => el.type === 'time'))
      .subscribe((el) => {
        this.isPlaying =
          el.data &&
          this.songData.compareQueues(this.album?.tracks?.data ?? []);
      });

    this.route.params.subscribe((params) => {
      this.loading = true;
      const id = Number(params['id']);
      this.api.getAlbum(id).subscribe((res) => {
        this.album = res;
        this.isPlaying =
          !this.audio.getAudio().paused &&
          this.songData.compareQueues(this.album?.tracks?.data ?? []);
        this.markIsFavorite();
        this.loading = false;
      });
    });
  }

  addToFavorite() {
    this.isFavoriteLoading = true
    this.userService.addToFavotiteAlbum(this.album).subscribe((user) => {
      if (!user.id) return;
      this.isFavorite = !this.isFavorite;
      this.userService.setUser(user)
      this.isFavoriteLoading = false
    });
  }

  private markIsFavorite() {
    const userAlbums = this.userService.getUser()?.favoriteAlbums ?? []
    this.isFavorite = userAlbums.some((e) => e.id === this.album.id);
  }
}

// !!!!!!!!!!!!! ТУПОЕ ГОВНО С SETMUSIC НАДО ФИЕСИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
