import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Artist } from '../../shared/interfaces/artist.interface';
import { Genres } from '../../shared/interfaces/album.interface';
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [ArtistComponent, LoaderComponent],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent {
  public genre!: Genres
  public genreArtist!: Artist[]

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.initAlbum()
  }

  private initAlbum() {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      // this.genre = null
      this.api.getGenre(String(id)).subscribe((res) => this.genre = res);
      this.api.getGenreArtists(String(id)).subscribe((res) => this.genreArtist = res.data);
    });
  }
}
