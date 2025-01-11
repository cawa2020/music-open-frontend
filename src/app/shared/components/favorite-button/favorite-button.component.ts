import { ChangeDetectionStrategy, Component, computed, input, Input, Signal, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Artist } from '../../interfaces/artist.interface';
import { Album, AlbumBrief } from '../../interfaces/album.interface';
import { Song } from '../../interfaces/song.interface';
import { UserApiService } from '../../../core/services/user-api.service';
import { User } from '../../interfaces/auth.interface';
import { ToastService } from '../../../core/services/toast.service';
import { Playlist } from '../../interfaces/playlist.interface';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
  public data = input.required<Song | Album | AlbumBrief | Artist | Playlist | null>();
  @Input() type: 'text' | 'icon' = 'icon';
  public isFavoriteLoading = signal(false);
  public isFavorite = computed(() => {
    const user = this.userService.user();
    if (!user) return false;
    const data = this.data()
    switch (data?.type) {
      case 'track': return user.favoriteSongs.some(track => track.id === data?.id);
      case 'album': return user.favoriteAlbums.some(album => album.id === data?.id);
      case 'artist': return user.favoriteArtists.some(artist => artist.id === data?.id);
      default: return false;
    }
  });

  constructor(
    private userService: UserService,
    private userApiService: UserApiService,
    private toast: ToastService
  ) { }

  addToFavorite() {
    const data = this.data()
    this.isFavoriteLoading.set(true);
    switch (data?.type) {
      case 'track':
        this.userApiService.addToFavotiteSong(data as Song)
          .subscribe(user => this.setUser(user));
        break;
      case 'album':
        this.userApiService.addToFavotiteAlbum(data as Album)
          .subscribe(user => this.setUser(user));
        break;
      case 'artist':
        this.userApiService.addToFavotiteArtist(data as Artist)
          .subscribe(user => this.setUser(user));
        break;
    }
  }

  private setUser(user: User | null): void {
    if (!user) return;
    this.userService.updateUser(user)
    this.isFavoriteLoading.set(false)
    this.toast.success(`${this.getTitle()} ${this.isUserContainData() ? 'добавлен в' : 'удален из'} Избранное`);
  }

  private getTitle(): string {
    const data = this.data()
    switch (data?.type) {
      case 'track': return data.title;
      case 'album': return data.title;
      case 'artist': return data.name;
      default: return '';
    }
  }

  private isUserContainData(): boolean {
    const user = this.userService.user();
    if (!user) return false;
    const data = this.data()
    switch (data?.type) {
      case 'track': return user.favoriteSongs.some(track => track.id === data?.id);
      case 'album': return user.favoriteAlbums.some(album => album.id === data?.id);
      case 'artist': return user.favoriteArtists.some(artist => artist.id === data?.id);
      default: return false;
    }
  }
}
