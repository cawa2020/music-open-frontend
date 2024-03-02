import { Component } from '@angular/core';
import { CurrentPlaylistComponent } from "../../components/current-playlist/current-playlist.component";
import { GridTemplateService } from '../../services/grid-template.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [CurrentPlaylistComponent]
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
