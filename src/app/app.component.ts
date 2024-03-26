import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { PlaylistsComponent } from "./components/playlists/playlists.component";
import { WidgetComponent } from "./components/widget/widget.component";
import { PlayerComponent } from "./components/player/player.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, PlaylistsComponent, NavComponent, WidgetComponent, PlayerComponent]
})
export class AppComponent {
  public isContained: boolean = localStorage.getItem('isContained') === 'true'

  toggleContained(value: boolean) {
    this.isContained = value
    localStorage.setItem('isContained', String(value))
  }
}
