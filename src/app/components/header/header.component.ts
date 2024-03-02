import { Component } from '@angular/core';
import { WidgetComponent } from "../widget/widget.component";
import { RouterLink } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { GridTemplateService } from '../../services/grid-template.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [WidgetComponent, RouterLink, PlayerComponent, MatIconModule]
})
export class HeaderComponent {
  public gridTemplate!: number[][]

  constructor(private grid: GridTemplateService) { }

  ngOnInit() {
    this.grid.getHeaderGrid().subscribe(item => {
      this.gridTemplate = item
    })
  }
}
