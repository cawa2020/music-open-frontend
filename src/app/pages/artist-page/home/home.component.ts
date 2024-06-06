import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Song } from '../../../shared/interfaces/song.interface';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { SongComponent } from "../../../shared/components/song/song.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [LoaderComponent, SongComponent, RouterLink]
})
export class HomeComponent {
  public songs: Song[] | null = null

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.songs = null
      const artistId = Number(params['id']);
      this.initSongs(artistId)
    });
  }

  initSongs(artistId: number) {
    this.api.getArtistTop(artistId, 5).subscribe((res) => {
      this.songs = res.data
    })
  }
}
