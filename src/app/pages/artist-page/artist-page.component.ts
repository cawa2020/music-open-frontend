import {
  Component,
  HostListener,
  OnInit,
  effect,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SongComponent } from '../../shared/components/song/song.component';
import { CommonModule } from '@angular/common';
import {
  Observable,
  filter,
  map,
  of,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { ArtistComponent } from '../../shared/components/artist-card/artist-card.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PlayButtonComponent } from '../../shared/components/play-button/play-button.component';
import { AudioService } from '../../core/services/audio.service';
import { SongService } from '../../core/services/song.service';
import { Album, AlbumBrief } from '../../shared/interfaces/album.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { Song } from '../../shared/interfaces/song.interface';
import { CookieService } from '../../core/services/cookie.service';
import { UserService } from '../../core/services/user.service';
import { AlbumCardComponent } from '../../shared/components/album-card/album-card.component';
import { beating } from '../../shared/animations/beating';
import { artistTabs } from '../../shared/constants/app.constant';
import { ArtistTab } from '../../shared/interfaces/app.interface';
import { HomeComponent } from "./home/home.component";
import { AlbumsComponent } from "./albums/albums.component";
import { SinglesComponent } from "./singles/singles.component";
import { RelatedComponent } from "./related/related.component";

@Component({
    selector: 'app-artist-page',
    standalone: true,
    templateUrl: './artist-page.component.html',
    styleUrl: './artist-page.component.css',
    animations: [beating],
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        SongComponent,
        CommonModule,
        AlbumCardComponent,
        ArtistComponent,
        LoaderComponent,
        PlayButtonComponent,
        HomeComponent,
        AlbumsComponent,
        SinglesComponent,
        RelatedComponent
    ]
})
export class ArtistPageComponent implements OnInit {
  public artist: Artist | null = null;
  public songs: Song[] = [];
  public isFavorite: boolean = false;
  public isFavoriteLoading: boolean = false;
  public isPlaying: boolean = false;
  public currentTab: ArtistTab = 'home'
  public tabs: { value: ArtistTab, title: string }[] = artistTabs

  constructor(
    private activateRoute: ActivatedRoute,
    private api: ApiService,
    private audio: AudioService,
    private songData: SongService,
    private userService: UserService,
    private userSerice: UserService,
    private router: ActivatedRoute
  ) {
    effect(() => {
      const favoriteArtists = userSerice.getUser()?.favoriteArtists ?? []
      const artistId = Number(this.router.snapshot.paramMap.get('id'))
      this.isFavorite = favoriteArtists.some(artist => artist.id === artistId);
    })
  }

  ngOnInit(): void {
    this.audio.audioChanges
      .pipe(filter((el) => el.type === 'time'))
      .subscribe((el) => { this.isPlaying = el.data && this.songData.compareQueues(this.songs); });

    this.activateRoute.params.subscribe((params) => {
      this.artist = null
      const id = Number(params['id']);
      this.initArtist(id)
    });
  }

  addToFavorite() {
    this.isFavoriteLoading = true
    if (!this.artist) return
    this.userService.addToFavotiteArtist(this.artist).subscribe((user) => {
      this.isFavoriteLoading = false
      if (!user.id) return;
      this.isFavorite = !this.isFavorite;
      this.userService.setUser(user)
    });
  }

  changeTab(tab: ArtistTab) {
    this.currentTab = tab
  }

  private markIsFavorite() {
    if (!this.artist) return
    const artists = this.userService.getUser()?.favoriteArtists ?? []
    this.isFavorite = artists.some((e) => e.id === this.artist?.id);
  }

  private initArtist(artistId: number): void {
    this.api.getArtist(artistId).subscribe((res) => this.artist = res)
    this.markIsFavorite();
    this.api.getArtistTop(artistId, 5).subscribe((res) => {
      this.songs = res.data;
      this.isPlaying = !this.audio.getAudio().paused && this.songData.compareQueues(this.songs);
    });
  }
}
