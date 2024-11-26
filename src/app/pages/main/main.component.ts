import { Component, Signal } from '@angular/core';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { Album } from '../../shared/interfaces/album.interface';
import { UserService } from '../../core/services/user.service';
import { AlbumCardComponent } from '../../shared/components/album-card/album-card.component';
import { PlaylistCardComponent } from '../../shared/components/playlist-card/playlist-card.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [AlbumCardComponent, PlaylistCardComponent]
})
export class MainComponent {
  public recently_played: Signal<(Album | Playlist)[]> = this.userService.select('recently_played')
  public loading: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true
  }
}
