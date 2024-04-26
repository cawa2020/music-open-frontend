import { Component, OnInit } from '@angular/core';
import { PlaylistsComponent } from "../../core/components/playlists/playlists.component";
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SongComponent } from "../../shared/components/song/song.component";
import { PlayerService } from '../../core/services/audio.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { Track } from '../../shared/interfaces/track.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [PlaylistsComponent, FormsModule, RouterLink, SongComponent, LoaderComponent]
})
export class SearchComponent implements OnInit {
  public search: string = ''
  public searchSubject = new Subject<string>()
  public findedSongs!: Track[]
  public loading: boolean = false

  constructor(private api: ApiService, private player: PlayerService, private router: Router, private route: ActivatedRoute) { }

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
}
