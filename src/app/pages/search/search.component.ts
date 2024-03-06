import { Component } from '@angular/core';
import { CurrentPlaylistComponent } from "../../components/current-playlist/current-playlist.component";
import { PlaylistsComponent } from "../../components/playlists/playlists.component";
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Album, Track } from '../../interfaces/app.interface';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormatterService } from '../../services/formatter.service';
import { SongComponent } from "../../components/song/song.component";
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [CurrentPlaylistComponent, PlaylistsComponent, FormsModule, RouterLink, SongComponent]
})
export class SearchComponent {
  public search: string = ''
  public searchSubject = new Subject<string>()
  public findedSongs!: Track[]
  public playlist!: Album

  constructor(private api: ApiService, private formatter: FormatterService, private player: PlayerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (!params.q?.length) return
      this.search = params.q;
      this.getBySearch(this.search)
    });


    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchValue) => {
      this.getBySearch(searchValue)
      this.router.navigate([], {
        queryParams: {
          q: searchValue
        },
        queryParamsHandling: 'merge',
      });
    });

  }

  handleSearch(value: string) {
    this.searchSubject.next(value)
    this.search = value
  }

  getBySearch(search: string) {
    this.api.getBySearch(search).subscribe((res: { data: Track[] }) => {
      this.findedSongs = res.data
      this.playlist = {
        id: 0,
        nb_tracks: this.findedSongs.length,
        duration: this.findedSongs.reduce((a, b) => a + b.duration, 0),
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
        },
        artist: {
          id: 0,
          name: 'Разные авторы',
          picture: 'string',
          picture_small: 'string',
          picture_medium: 'string',
          picture_big: 'string',
          picture_xl: 'string',
          tracklist: 'string',
          type: 'string',
        },
        title: `Поиск по запросу "${search}"`
      }
    })
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }
}
