import { Component, OnInit, effect } from '@angular/core';
import { Album } from '../../shared/interfaces/album.interface';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { UserService } from '../../core/services/user.service';
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";
import { PlaylistCardComponent } from "../../shared/components/playlist-card/playlist-card.component";
import { AlbumCardComponent } from "../../shared/components/album-card/album-card.component";

@Component({
    selector: 'app-library',
    standalone: true,
    templateUrl: './library.component.html',
    styleUrl: './library.component.css',
    imports: [ArtistComponent, PlaylistCardComponent, AlbumCardComponent]
})
export class LibraryComponent {
  public utilities: (Album | Playlist | Artist)[] = []

  constructor(private userService: UserService) {
    effect(() => {
      const user = this.userService.getUser()
      if (!user) return
      this.utilities = [...user.favoriteAlbums, ...user.favoriteArtists, ...user.favoritePlaylists]
    })
  }
}
