import { Component, Signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Artist } from '../../shared/interfaces/artist.interface';
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorite-artists',
  standalone: true,
  templateUrl: './favorite-artists.component.html',
  styleUrl: './favorite-artists.component.css',
  imports: [ArtistComponent]
})
export class FavoriteArtistsComponent {
  public artists: Signal<Artist[]> = this.userService.select('favoriteArtists')

  constructor(private userService: UserService) { }
}
