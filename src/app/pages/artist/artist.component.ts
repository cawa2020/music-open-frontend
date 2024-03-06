import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Album, Artist, Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { PlaylistsComponent } from "../../components/playlists/playlists.component";
import { SongComponent } from "../../components/song/song.component";

@Component({
  selector: 'app-artist',
  standalone: true,
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
  imports: [RouterLink, PlaylistsComponent, SongComponent]
})
export class ArtistComponent implements OnInit {
  public artist!: Artist
  public artistSongs!: Album

  constructor(private activateRoute: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const id = Number(params["id"])

      this.api.getAtrist(id).subscribe(res => {
        this.artist = res

        this.api.getBySearch(this.artist.name).subscribe(res => {
          this.artistSongs = {
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
