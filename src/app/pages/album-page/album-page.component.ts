import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { SongComponent } from '../../shared/components/song/song.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PlayButtonComponent } from '../../shared/components/play-button/play-button.component';
import { PlayerService } from '../../core/services/audio.service';
import { filter, isEmpty } from 'rxjs';
import { SongService } from '../../core/services/song.service';
import { Album } from '../../shared/interfaces/album.interface';
import { AuthService } from '../../core/services/auth.service';
import { CookieService } from '../../core/services/cookie.service';
import { UserService } from '../../core/services/user.service';
import { UserMusicService } from '../../core/services/user-music.service';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlbumPageComponent implements OnInit {
  public album!: Album;
  public isPlaying: boolean = false;
  public loading: boolean = false;
  public isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private player: PlayerService,
    private songData: SongService,
    private cookie: CookieService,
    private userService: UserService,
    private userMusic: UserMusicService
  ) {}

  ngOnInit() {
    this.player.audioChanges
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
          !this.player.getAudio().paused &&
          this.songData.compareQueues(this.album?.tracks?.data ?? []);
        this.markIsFavorite();
        this.loading = false;
      });
    });
  }

  get genres(): string {
    return this.album.genres?.data.map((el) => el.name).join(', ') ?? '';
  }

  get favoriteIcon(): string {
    return this.isFavorite ? 'heart' : 'heart-outline';
  }

  isLastArtist(index: number): boolean {
    return index === this.album.contributors.length - 1;
  }

  addToFavorite() {
    const token = this.cookie.get('access_token');
    this.userService.addToFavotiteAlbum(this.album, token).subscribe((user) => {
      if (!user.id) return;
      this.isFavorite = !this.isFavorite;
      const favoriteSongsCollection = this.userMusic.getMusic().getValue()[0];
      this.userMusic.setMusic([
        favoriteSongsCollection,
        ...user.favoritePlaylists,
        ...user.favoriteAlbums,
        ...user.favoriteArtists,
      ]);
    });
  }

  private markIsFavorite() {
    this.userMusic.getMusic().subscribe((music) => {
      this.isFavorite = music.some((e) => e.id === this.album.id);
    });
  }
}

// !!!!!!!!!!!!! ТУПОЕ ГОВНО С SETMUSIC НАДО ФИЕСИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
