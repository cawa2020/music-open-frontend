import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CurrentPlaylistComponent } from "./components/current-playlist/current-playlist.component";
import { PlaylistsComponent } from "./components/playlists/playlists.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HeaderComponent, CurrentPlaylistComponent, PlaylistsComponent]
})
export class AppComponent {
  title = 'template-development';
}
