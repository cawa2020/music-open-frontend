import { Component, effect } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Artist } from '../../shared/interfaces/artist.interface';
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";

@Component({
    selector: 'app-favorite-artists',
    standalone: true,
    templateUrl: './favorite-artists.component.html',
    styleUrl: './favorite-artists.component.css',
    imports: [ArtistComponent]
})
export class FavoriteArtistsComponent {
  public artists: Artist[] = []

  constructor(private userService: UserService) {
    effect(() => {
      const user = this.userService.getUser()
      if (!user) return
      this.artists = user.favoriteArtists
    })
  }
}
