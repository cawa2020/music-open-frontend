import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Artist } from '../../interfaces/artist.interface';
import { Album, AlbumBrief } from '../../interfaces/album.interface';
import { Song } from '../../interfaces/song.interface';
import { UserApiService } from '../../../core/services/user-api.service';
import { User } from '../../interfaces/auth.interface';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css',
})
export class FavoriteButtonComponent {
  @Input({ required: true }) data: Song | Album | AlbumBrief | Artist | null = null;
  @Input() type: 'text' | 'icon' = 'icon';
  public isFavoriteLoading = signal(false);
  public isFavorite = computed(() => {
    switch (this.data?.type) {
      case 'track':
        const userFavoritesSongs = this.userService.user()?.favoriteSongs ?? []
        return userFavoritesSongs.some(track => track.id === this.data?.id);
      case 'album':
        const userFavoritesAlbums = this.userService.user()?.favoriteAlbums ?? []
        return userFavoritesAlbums.some(album => album.id === this.data?.id);
      case 'artist':
        const userFavoritesArtists = this.userService.user()?.favoriteArtists ?? []
        return userFavoritesArtists.some(artist => artist.id === this.data?.id);
      default:
        return false;
    }
  });

  constructor(
    private userService: UserService,
    private userApiService: UserApiService,
    private toast: ToastService
  ) { }

  addToFavorite() {
    this.isFavoriteLoading.set(true);
    switch (this.data?.type) {
      case 'track':
        this.userApiService.addToFavotiteSong(this.data as Song).subscribe(user => this.setUser(user));
        break;
      case 'album':
        this.userApiService.addToFavotiteAlbum(this.data as Album).subscribe(user => this.setUser(user));
        break;
      case 'artist':
        this.userApiService.addToFavotiteArtist(this.data as Artist).subscribe(user => this.setUser(user));
        break;
    }
  }

  private setUser(user: User | null): void {
    if (!user) return;
    this.userService.setUser(user)
    this.isFavoriteLoading.set(false)
    this.toast.success(`${this.getTitle()} добавлен(а) в Избранное`);
    // TODO: изменить текст на удалено или добавлено
  }

  private getTitle(): string {
    switch (this.data?.type) {
      case 'track':
        return this.data.title;
      case 'album':
        return this.data.title;
      case 'artist':
        return this.data.name;
      default:
        return '';
    }
  }
}
