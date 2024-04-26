import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, NavigationStart, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { Album } from '../../../shared/interfaces/album.interface';

const ids = [552823212]

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
  public playlists: Album[] = []
  public currentPlaylistId!: number

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    ids.map(id => {
      this.api.getAlbum(id).subscribe(res => { this.playlists.push(res) })
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
}