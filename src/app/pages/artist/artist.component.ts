import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Album, AlbumBrief, Artist, ArtistBrief, Playlist, Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { PlaylistsComponent } from "../../components/playlists/playlists.component";
import { SongComponent } from "../../components/song/song.component";
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-artist',
  standalone: true,
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PlaylistsComponent, SongComponent, CommonModule]
})
export class ArtistComponent implements OnInit {
  public artist!: Artist
  public songs!: Album
  public albums!: AlbumBrief[]
  public related!: Artist[]
  public playlists!: Playlist[]

  constructor(private activateRoute: ActivatedRoute, private api: ApiService, private router: Router) { }

  scrollTo() {
    this.router.navigate([], { fragment: "RED" });
  }

  getPlaylist(): Album {
    return JSON.parse(JSON.stringify(this.songs))
  }

  ngOnInit(): void {
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
}
