import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlbumBrief, Artist, Playlist, Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { PlaylistsComponent } from "../../components/playlists/playlists.component";
import { SongComponent } from "../../components/song/song.component";
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from "../../components/skeleton/skeleton.component";
import { Observable, map, of, shareReplay, switchMap } from 'rxjs';
import { AlbumComponent } from "../../components/album/album.component";
import { ArtistComponent } from '../../components/artist/artist.component';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PlaylistsComponent, SongComponent, CommonModule, SkeletonComponent, AlbumComponent, ArtistComponent]
})
export class ArtistPageComponent implements OnInit {
  public id!: number
  public artist$!: Observable<Artist>
  public albums$!: Observable<AlbumBrief[] | null>
  public related$!: Observable<Artist[] | null>
  public playlists$!: Observable<Playlist[] | null>
  public songs: Track[] | undefined

  public lastIndexAlbum: number = 8
  public lastIndexRelated: number = 8
  public lastIndexPlaylists: number = 8

  constructor(private activateRoute: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.onResize({ target: { innerWidth: window.innerWidth } })

    this.activateRoute.params.subscribe(params => {
      const id = Number(params["id"])
      this.id = id
      this.albums$ = of(null)
      this.related$ = of(null)
      this.playlists$ = of(null)

      this.artist$ = this.api.getArtist(id).pipe(shareReplay(1))
      this.artist$.pipe(switchMap((artist: Artist) => this.api.getArtistTop(artist.id, 5))).subscribe(res => this.songs = res.data)
      this.albums$ = this.artist$.pipe(switchMap((artist: Artist) => this.api.getArtistAlbums(artist.id, 7).pipe(map(res => this.sortByDate(res.data)))))
      this.related$ = this.artist$.pipe(switchMap((artist: Artist) => this.api.getArtistRelated(artist.id, 7).pipe(map(res => res.data))))
      this.playlists$ = this.artist$.pipe(switchMap((artist: Artist) => this.api.getPlaylistsWithArtist(artist.id).pipe(map(res => res.data))))
    });
  }

  private sortByDate(arr: AlbumBrief[]): AlbumBrief[] {
    return arr.sort((a, b) => {
      const date1 = new Date(a.release_date)
      const date2 = new Date(b.release_date)
      if (date1 > date2) return -1
      else if (date1 < date2) return 1
      else return 0
    })
  }

  getQueue(): Track[] {
    return this.songs ?? []
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth
    let newIndex
    if (width > 1600) {
      newIndex = 7
    } else if (width > 1400) {
      newIndex = 6
    } else if (width > 1200) {
      newIndex = 5
    } else if (width > 1000) {
      newIndex = 4
    } else {
      newIndex = 4
    }

    this.lastIndexAlbum = newIndex
    this.lastIndexRelated = newIndex
    this.lastIndexPlaylists = newIndex
  }
}
