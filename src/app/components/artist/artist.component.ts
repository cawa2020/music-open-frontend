import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Artist } from '../../interfaces/app.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent {
  @Input() artist!: Artist
}
