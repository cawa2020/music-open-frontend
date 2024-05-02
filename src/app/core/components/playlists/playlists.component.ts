import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, NavigationStart, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { Album } from '../../../shared/interfaces/album.interface';
import { UserService } from '../../services/user.service';
import { Playlist } from '../../../shared/interfaces/playlist.interface';
import { Artist } from '../../../shared/interfaces/artist.interface';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css', '../nav/nav.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PlaylistsComponent implements OnInit {
  @Output() toggleShortEmitter = new EventEmitter()
  @Input() isShort!: boolean
  public playlists: (Album | Playlist | Artist)[] = []
  public currentPlaylistId!: number

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userChanges.subscribe(() => {
      const user = this.userService.getUser()
      if (!user) return
      console.log(user)
      this.playlists = [...user.favoriteAlbums, ...user.favoriteArtists, ...user.favoritePlaylists]
    })

    this.route.params.subscribe(params => {
      this.currentPlaylistId = Number(params["id"])
    });

    this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe(el => {
      this.currentPlaylistId = Number(el.url.split('/').slice(-1))
    })
  }

  routeToPlaylist(id: number, type: string) {
    const url = type + '/' + id
    this.router.navigate([url])
  }

  toggleShort() {
    this.toggleShortEmitter.emit(!this.isShort)
  }

  getCover(el: Album | Playlist | Artist): string {
    if ('cover_small' in el) {
      return el.cover_small ?? '../../assets/placeholder.jpg';
    } else {
      return '../../assets/placeholder.jpg'
    }
  }

  getTitle(el: Album | Playlist | Artist): string {
    if ('title' in el) {
      return el.title;
    } else {
      return el.name
    }
  }

  getSecondaryText(el: Album | Playlist | Artist): string {
    if ('artist' in el) {
      return `${el.type} • ${el.artist.name}`
    } else {
      return el.type
    }
  }
}
