import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Album } from '../../interfaces/app.interface';
import { ActivatedRoute, NavigationStart, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';

const ids = [175718342]

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css', '../nav/nav.component.css']
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
    this.toggleShortEmitter.emit()
  }
}
