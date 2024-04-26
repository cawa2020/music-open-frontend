import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Artist } from '../../interfaces/artist.interface';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.css'
})
export class ArtistComponent {
  @Input() artist!: Artist
}
