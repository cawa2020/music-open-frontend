import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-current-playlist',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './current-playlist.component.html',
  styleUrl: './current-playlist.component.css'
})
export class CurrentPlaylistComponent {
  public isExpanded: boolean = true
  public classes: string = 'h-[var(--main-height)] overflow-auto mt-4'

}
