import { Component, effect, OnDestroy, OnInit, Signal } from '@angular/core';
import { AlbumCardComponent } from "../../shared/components/album-card/album-card.component";
import { UserService } from '../../core/services/user.service';
import { Album } from '../../shared/interfaces/album.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-favorite-albums',
  standalone: true,
  templateUrl: './favorite-albums.component.html',
  styleUrl: './favorite-albums.component.css',
  imports: [AlbumCardComponent]
})
export class FavoriteAlbumsComponent implements OnInit, OnDestroy {
  public albums: Signal<Album[]> = this.userService.select('favoriteAlbums')

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
