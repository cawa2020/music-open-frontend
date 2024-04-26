import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { PlaylistsComponent } from "./core/components/playlists/playlists.component";
import { WidgetComponent } from "./core/components/widget/widget.component";
import { PlayerComponent } from "./core/components/player/player.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, PlaylistsComponent, NavComponent, WidgetComponent, PlayerComponent]
})
export class AppComponent implements OnInit {
  public isContained: boolean = localStorage.getItem('isContained') === 'true'

  ngOnInit(): void {
    if (window.innerWidth <= 900) {
      this.isContained = true
    }
  }

  setContained(value: boolean) {
    this.isContained = value
    localStorage.setItem('isContained', String(this.isContained))
  }

  @HostListener('window:resize', ['$event'])
  toggleContained(event: any) {
    const width = event.target.innerWidth
    if (width <= 900) {
      this.setContained(true)
    }
  }
}
