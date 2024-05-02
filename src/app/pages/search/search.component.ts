import { Component, OnInit } from '@angular/core';
import { PlaylistsComponent } from "../../core/components/playlists/playlists.component";
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SongComponent } from "../../shared/components/song/song.component";
import { PlayerService } from '../../core/services/audio.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { Song } from '../../shared/interfaces/track.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [PlaylistsComponent, FormsModule, RouterLink, SongComponent, LoaderComponent]
})
export class SearchComponent implements OnInit {
  private timeout!: any
  public search: string = ''
  public findedSongs!: Song[]
  public loading: boolean = false

  constructor(private api: ApiService, private player: PlayerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (!params.q?.length) return
      this.search = params.q;
      this.getBySearch(this.search)
    });
  }

  handleSearch(value: string) {
    this.loading = true
    this.search = value

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.getBySearch(this.search)
      const params = { q: this.search }
      this.router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
    }, 300)
  }

  getBySearch(search: string) {
    this.loading = true
    this.api.getBySearch(search).subscribe((res: { data: Song[] }) => {
      this.findedSongs = res.data
      // this.loading = false
    })
  }
}
