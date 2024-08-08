import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Artist } from '../../shared/interfaces/artist.interface';
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-favorite-artists',
  standalone: true,
  templateUrl: './favorite-artists.component.html',
  styleUrl: './favorite-artists.component.css',
  imports: [ArtistComponent]
})
export class FavoriteArtistsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>()
  public artists: Artist[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (!user) return
      this.artists = user.favoriteArtists
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
