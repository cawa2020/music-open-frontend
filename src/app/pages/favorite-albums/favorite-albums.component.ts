import { Component, effect, OnDestroy, OnInit } from '@angular/core';
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
export class FavoriteAlbumsComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject<void>()
  public albums: Album[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (!user) return
      this.albums = user.favoriteAlbums
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
