import { Component } from '@angular/core';
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
  public recently_played: any[] = []
  // public recently_played: (Album | Playlist)[] = [] !!!!!!!!!!!!!!!!!!!
  public loading: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true
    this.userService.changes.subscribe(() => {
      const user = this.userService.getUser()
      if (!user) return
      this.recently_played = user.recently_played
    })
  }
}
