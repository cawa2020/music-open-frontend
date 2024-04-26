import { Component } from '@angular/core';
import { PlaylistsComponent } from "../../core/components/playlists/playlists.component";

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [PlaylistsComponent]
})
export class MainComponent {

  constructor() { }

  ngOnInit() {
  }
}
