import { Component, OnInit, Signal } from '@angular/core';
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
  public songs: Signal<Song[]> = this.userService.select('favoriteSongs')

  constructor(private userService: UserService) { }
}
