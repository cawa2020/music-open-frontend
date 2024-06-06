import { Component, effect } from '@angular/core';
import { Song } from '../../shared/interfaces/song.interface';
import { UserService } from '../../core/services/user.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { SongComponent } from "../../shared/components/song/song.component";

@Component({
    selector: 'app-favorite-songs',
    standalone: true,
    templateUrl: './favorite-songs.component.html',
    styleUrl: './favorite-songs.component.css',
    imports: [LoaderComponent, SongComponent]
})
export class FavoriteSongsComponent {
  public songs: Song[] | undefined

  constructor(private userService: UserService) {
    effect(() => {
      const user = this.userService.getUser()
      if (!user) return
      this.songs = user.favoriteSongs
    })
  }
}
