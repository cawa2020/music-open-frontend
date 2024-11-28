import { Component, Input } from '@angular/core';
import { PlayButtonComponent } from '../../../shared/components/play-button/play-button.component';
import { Artist } from '../../../shared/interfaces/artist.interface';
import { Song } from '../../../shared/interfaces/song.interface';
import { FavoriteButtonComponent } from "../../../shared/components/favorite-button/favorite-button.component";

@Component({
  selector: 'app-artist-page-header',
  standalone: true,
  imports: [PlayButtonComponent, FavoriteButtonComponent],
  templateUrl: './artist-page-header.component.html',
  styleUrl: './artist-page-header.component.css'
})
export class ArtistPageHeaderComponent {
  @Input() artist!: Artist
  @Input() queue: Song[] = [];

  constructor() { }
}
