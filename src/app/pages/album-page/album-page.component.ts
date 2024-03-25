import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsComponent } from "../../components/playlists/playlists.component";
import { CurrentPlaylistComponent } from "../../components/current-playlist/current-playlist.component";

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [PlaylistsComponent, CurrentPlaylistComponent]
})
export class AlbumPageComponent {
  public id!: number

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = Number(params["id"]));
  }
}
