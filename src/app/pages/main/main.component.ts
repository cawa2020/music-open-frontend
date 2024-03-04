import { Component } from '@angular/core';
import { CurrentPlaylistComponent } from "../../components/current-playlist/current-playlist.component";
import { GridTemplateService } from '../../services/grid-template.service';
import { PlaylistsComponent } from "../../components/playlists/playlists.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [CurrentPlaylistComponent, PlaylistsComponent]
})
export class MainComponent {
  public gridTemplate!: number[][]

  constructor(private grid: GridTemplateService) { }

  ngOnInit() {
    this.grid.getMainGrid().subscribe(item => {
      this.gridTemplate = item
    })
  }
}
