import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Album } from '../../interfaces/app.interface';
import { FormatterService } from '../../services/formatter.service';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})

export class PlaylistsComponent implements OnInit {
  public playlists: Album[] = []
  public isShort: boolean = localStorage.getItem('isShort') === 'true'
  private albumsId: number[] = [450224025]
  public currentPlaylistId!: number

  constructor(private api: ApiService, private formatter: FormatterService, private player: PlayerService, private router: Router) { }

  ngOnInit(): void {
    const id = window.location.href.split('/').slice(-1)
    this.currentPlaylistId = Number(id)

    this.albumsId.map(id => {
      this.api.getAlbum(id).subscribe(res => {
        this.playlists.push(res)
      })
    })

    this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe(el => {
      const id = el.url.split('/').slice(-1)
      this.currentPlaylistId = Number(id)
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
    this.isShort = !this.isShort
    localStorage.setItem('isShort', String(this.isShort))
  }
}
