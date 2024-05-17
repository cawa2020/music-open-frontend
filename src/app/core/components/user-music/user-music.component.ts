import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../../../shared/interfaces/album.interface';
import { UserService } from '../../services/user.service';
import { Playlist } from '../../../shared/interfaces/playlist.interface';
import { Artist } from '../../../shared/interfaces/artist.interface';
import { Collection } from '../../../shared/interfaces/collection.interface';
import { UserMusicService } from '../../services/user-music.service';

@Component({
  selector: 'app-user-music',
  standalone: true,
  imports: [],
  templateUrl: './user-music.component.html',
  styleUrls: ['./user-music.component.css', '../nav/nav.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserMusicComponent {
  public isShort: boolean = true;
  public userMusic: (Album | Playlist | Artist | Collection)[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private userMusicService: UserMusicService
  ) {}

  ngOnInit(): void {
    this.userService.changes.subscribe(() => {
      const user = this.userService.getUser();
      if (!user) return;
      const favoriteCollection: Collection = {
        id: 'songs',
        title: 'Favorite songs',
        songs: user.favoriteSongs,
        type: 'collection',
      };

      this.userMusic = [
        favoriteCollection,
        ...user.favoritePlaylists,
        ...user.favoriteAlbums,
        ...user.favoriteArtists,
      ];
      this.userMusicService.setMusic(this.userMusic);
    });

    this.userMusicService.getMusic().subscribe((value) => {
      this.userMusic = value;
    });
  }

  routeToPlaylist(id: number | string, type: string) {
    const url = type + '/' + id;
    this.router.navigate([url]);
  }

  toggleShort() {
    this.isShort = !this.isShort;
  }

  getBorderRadius(el: Album | Playlist | Artist | Collection): string {
    if (el.type === 'artist') {
      return 'rounded-full';
    } else {
      return 'rounded';
    }
  }

  getCover(el: Album | Playlist | Artist | Collection): string {
    if ('cover_small' in el) {
      return el.cover_small ?? '../../assets/placeholder.jpg';
    } else if ('picture_small' in el) {
      return el.picture_small;
    } else if (el.type === 'collection') {
      return 'https://misc.scdn.co/liked-songs/liked-songs-300.png';
    } else {
      return '../../assets/placeholder.jpg';
    }
  }

  getTitle(el: Album | Playlist | Artist | Collection): string {
    if ('title' in el) {
      return el.title;
    } else {
      return el.name;
    }
  }

  getSecondaryText(el: Album | Playlist | Artist | Collection): string {
    if ('artist' in el) {
      return `${el.type} • ${el.artist.name}`;
    } else {
      return el.type;
    }
  }
}
