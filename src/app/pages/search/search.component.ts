import { Component } from '@angular/core';
import { PlaylistsComponent } from "../../components/playlists/playlists.component";
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Album, Track } from '../../interfaces/app.interface';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormatterService } from '../../services/formatter.service';
import { SongComponent } from "../../components/song/song.component";
import { PlayerService } from '../../services/audio.service';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [PlaylistsComponent, FormsModule, RouterLink, SongComponent, LoaderComponent]
})
export class SearchComponent {
  public search: string = ''
  public searchSubject = new Subject<string>()
  public findedSongs!: Track[]
  public loading: boolean = false

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
    this.loading = true
    this.searchSubject.next(value)
    this.search = value
  }

  getBySearch(search: string) {
    this.loading = true
    this.api.getBySearch(search).subscribe((res: { data: Track[] }) => {
      this.findedSongs = res.data
      this.loading = false
    })
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }
}
