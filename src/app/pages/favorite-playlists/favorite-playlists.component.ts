import { Component, computed, inject, Signal } from '@angular/core';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { UserService } from '../../core/services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { PlaylistCardComponent } from "../../shared/components/playlist-card/playlist-card.component";
import { ContextMenuService } from '../../core/services/context-menu.service';
import { ApiService } from '../../core/services/api.service';
import { CookieService } from '../../core/services/cookie.service';

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
    // !!!!!!!!!!!!!!! createdPlaylists netu polya
    // return [...user?.favoritePlaylists, ...user?.createdPlaylists]
    return [...user?.favoritePlaylists]
  })

  constructor(private userService: UserService, private contextMenu: ContextMenuService, private cookie: CookieService, private api: ApiService) { }

  ngOnInit(): void {
  }

  createPlaylist(cookie: any, api: any, user: any) {
    const token = cookie.get('access_token');
    if (!token) return
    const createdPlaylists = user.getUser()?.createdPlaylists
    if (!createdPlaylists) return

    api.createPlaylist(token, {
      title: `My Playlist #${createdPlaylists.length}`,
      songs: []
    }).subscribe((el: any) => console.log(el))
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault()
    this.contextMenu.open({ id: 'favorite-playlists', items: [{ event: () => this.createPlaylist(this.cookie, this.api, this.userService), title: 'Create playlist' }], position: [event.clientX, event.clientY] })
  }

  ngOnDestroy(): void { }
}
