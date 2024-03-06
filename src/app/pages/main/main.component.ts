import { Component } from '@angular/core';
import { CurrentPlaylistComponent } from "../../components/current-playlist/current-playlist.component";
import { PlaylistsComponent } from "../../components/playlists/playlists.component";

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [CurrentPlaylistComponent, PlaylistsComponent]
})
export class MainComponent {

  constructor() { }

  ngOnInit() {
  }
}
