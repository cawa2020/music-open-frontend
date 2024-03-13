import { Component, ContentChild, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Album, AlbumBrief, Artist, ArtistBrief, Playlist, Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { PlaylistsComponent } from "../../components/playlists/playlists.component";
import { SongComponent } from "../../components/song/song.component";
import { CommonModule, ViewportScroller } from '@angular/common';
import { SkeletonComponent } from "../../components/skeleton/skeleton.component";

@Component({
    selector: 'app-artist',
    standalone: true,
    templateUrl: './artist.component.html',
    styleUrl: './artist.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, PlaylistsComponent, SongComponent, CommonModule, SkeletonComponent]
})
export class ArtistComponent implements OnInit {
  public artist!: Artist
  public songs!: Album
  public albums!: AlbumBrief[]
  public lastIndexAlbum: number = 8
  public related!: Artist[]
  public lastIndexRelated: number = 8
  public playlists!: Playlist[]
  public lastIndexPlaylists: number = 8

  constructor(private activateRoute: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.onResize({ target: { innerWidth: window.innerWidth } })

    this.activateRoute.params.subscribe(params => {
      const id = Number(params["id"])
      scrollTo()
      this.api.getAtrist(id).subscribe(res => {
        this.artist = res

        this.api.getArtistRelated(this.artist.id).subscribe(res => this.related = res.data)

        this.api.getPlaylistsWithArtist(this.artist.id).subscribe(res => this.playlists = res.data)

        this.api.getArtistAlbums(this.artist.id).subscribe(res => {
          res.data.sort((a, b) => {
            const date1 = new Date(a.release_date)
            const date2 = new Date(b.release_date)
            if (date1 > date2) return -1
            else if (date1 < date2) return 1
            else return 0
          })
          this.albums = res.data
        })

        this.api.getArtistTop(this.artist.id).subscribe(res => {
          this.songs = {
            id: 0,
            title: '',
            nb_tracks: 0,
            duration: 0,
            fans: 0,
            release_date: '',
            record_type: '',
            available: false,
            tracklist: '',
            explicit_lyrics: false,
            explicit_content_lyrics: 0,
            explicit_content_cover: 0,
            contributors: [],
            type: '',
            tracks: {
              data: res.data
            }
          }
        })
      })
    });
  }

  getPlaylist(): Album {
    return JSON.parse(JSON.stringify(this.songs))
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth
    if (width > 1536) {
      this.lastIndexAlbum = 8
      this.lastIndexRelated = 8
      this.lastIndexPlaylists = 8
    } else if (width > 1280) {
      this.lastIndexAlbum = 6
      this.lastIndexRelated = 6
      this.lastIndexPlaylists = 6
    } else if (width > 1024) {
      this.lastIndexAlbum = 5
      this.lastIndexRelated = 5
      this.lastIndexPlaylists = 5
    } else {
      this.lastIndexAlbum = 4
      this.lastIndexRelated = 4
      this.lastIndexPlaylists = 4
    }
  }
}
