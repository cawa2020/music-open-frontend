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

  constructor(private api: ApiService, private formatter: FormatterService, private player: PlayerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (!params.q?.length) return
      this.search = params.q;
      this.getBySearch(this.search)
    });


    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
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
    })
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }
}
