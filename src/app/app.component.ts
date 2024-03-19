import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { CurrentPlaylistComponent } from "./components/current-playlist/current-playlist.component";
import { PlaylistsComponent } from "./components/playlists/playlists.component";
import { FooterComponent } from "./components/footer/footer.component";
import { WidgetComponent } from "./components/widget/widget.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, CurrentPlaylistComponent, PlaylistsComponent, FooterComponent, NavComponent, WidgetComponent]
})
export class AppComponent {
  public isContained: boolean = localStorage.getItem('isContained') === 'true'

  toggleContained(value: boolean) {
    this.isContained = value
    localStorage.setItem('isContained', String(value))
  }
}
