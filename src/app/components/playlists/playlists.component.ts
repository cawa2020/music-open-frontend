import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Album } from '../../interfaces/app.interface';
import { FormatterService } from '../../services/formatter.service';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css', '../nav/nav.component.css']
})

export class PlaylistsComponent implements OnInit {
  @Output() toggleShortEmitter: EventEmitter<boolean> = new EventEmitter()
  @Input() isShort!: boolean
  public playlists: Album[] = []
  private albumsId: number[] = [562376871, 175718342, 536741192]
  public currentPlaylistId!: number

  constructor(private api: ApiService, private formatter: FormatterService, private router: Router) { }

  ngOnInit(): void {
    this.currentPlaylistId = Number(window.location.href.split('/').slice(-1))

    this.albumsId.map(id => {
      this.api.getAlbum(id).subscribe(res => { this.playlists.push(res) })
    })

    this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe(el => {
      this.currentPlaylistId = Number(el.url.split('/').slice(-1))
    })
  }

  getTime(duration: number): string {
    return this.formatter.getTime(duration)
  }

  routeToPlaylist(id: number, type: string) {
    const url = type + '/' + id
    this.router.navigate([url])
  }

  toggleShort() {
    this.toggleShortEmitter.emit(!this.isShort)
  }
}
