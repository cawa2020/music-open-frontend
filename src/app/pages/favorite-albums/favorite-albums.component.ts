import { Component, effect } from '@angular/core';
import { AlbumCardComponent } from "../../shared/components/album-card/album-card.component";
import { UserService } from '../../core/services/user.service';
import { Album } from '../../shared/interfaces/album.interface';

@Component({
    selector: 'app-favorite-albums',
    standalone: true,
    templateUrl: './favorite-albums.component.html',
    styleUrl: './favorite-albums.component.css',
    imports: [AlbumCardComponent]
})
export class FavoriteAlbumsComponent {
  public albums: Album[] = []

  constructor(private userService: UserService) {
    effect(() => {
      const user = this.userService.getUser()
      if (!user) return
      this.albums = user.favoriteAlbums
    })
  }
}
