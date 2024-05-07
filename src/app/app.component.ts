import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { PlaylistsComponent } from "./core/components/playlists/playlists.component";
import { PlayerComponent } from "./core/components/player/player.component";
import { UserService } from './core/services/user.service';
import { CookieService } from './core/services/cookie.service';
import { ApiService } from './core/services/api.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, PlaylistsComponent, NavComponent, PlayerComponent]
})
export class AppComponent implements OnInit {
  public isContained: boolean = localStorage.getItem('isContained') === 'true'

  constructor(private userService: UserService, private cookie: CookieService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 900) {
      this.isContained = true
    }

    const token = this.cookie.get('access_token')
    if (!token) return
    this.userService.fetchUserData(token).subscribe(user => {
      this.userService.setUser(user)
    })
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
