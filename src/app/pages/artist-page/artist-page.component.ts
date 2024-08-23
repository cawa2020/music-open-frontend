import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { Artist } from '../../shared/interfaces/artist.interface';
import { Song } from '../../shared/interfaces/song.interface';
import { beating } from '../../shared/animations/beating';
import { ArtistPageHeaderComponent } from './artist-page-header/artist-page-header.component';
import { ArtistPageTabsComponent } from './artist-page-tabs/artist-page-tabs.component';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.css',
  animations: [beating],
  imports: [
    CommonModule,
    LoaderComponent,
    ArtistPageTabsComponent,
    ArtistPageHeaderComponent
  ]
})
export class ArtistPageComponent implements OnInit {
  public artist: Artist | null = null;
  public songs: Song[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.initArtist()
  }

  private initArtist(): void {
    this.activateRoute.params.subscribe((params) => {
      this.artist = null
      const id = Number(params['id'])
      this.api.getArtist(id).subscribe((res) => this.artist = res)
      this.api.getArtistTop(id, 5).subscribe((res) => { this.songs = res.data })
    })
  }
}
