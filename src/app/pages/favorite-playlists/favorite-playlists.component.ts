import { Component, computed, Signal } from '@angular/core';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { UserService } from '../../core/services/user.service';
import { PlaylistCardComponent } from "../../shared/components/playlist-card/playlist-card.component";
import { ContextMenuService } from '../../core/services/context-menu.service';
import { ApiService } from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-favorite-playlists',
  standalone: true,
  imports: [PlaylistCardComponent],
  templateUrl: './favorite-playlists.component.html',
  styleUrl: './favorite-playlists.component.css'
})
export class FavoritePlaylistsComponent {
  public playlists: Signal<Playlist[]> = computed(() => {
    const user = this.userService.user()
    if (!user) return []
    return [...user?.favoritePlaylists, ...user?.playlists]
  })

  constructor(private userService: UserService, private contextMenu: ContextMenuService, private api: ApiService, private toastService: ToastService) { }

  createPlaylist(api: ApiService, user: UserService) {
    const createdPlaylists = user.user()?.playlists
    if (!createdPlaylists) return

    api.createPlaylist({
      title: `My Playlist #${createdPlaylists.length}`,
      songs: []
    }).subscribe(() => this.toastService.success('Плейлист успешно создан!'))
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault()
    const coords = { x: event.clientX, y: event.clientY }
    const item = { event: () => this.createPlaylist(this.api, this.userService), title: 'Create playlist' }
    this.contextMenu.open({ id: 'favorite-playlists', items: [item], position: coords })
  }
}
