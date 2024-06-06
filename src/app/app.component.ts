import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { PlayerComponent } from './core/components/player/player.component';
import { UserService } from './core/services/user.service';
import { CookieService } from './core/services/cookie.service';
import { UserMusicComponent } from './core/components/user-music/user-music.component';
import { ToastsComponent } from './core/components/toasts/toasts.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    ToastsComponent,
    CommonModule,
    RouterOutlet,
    NavComponent,
    PlayerComponent,
    UserMusicComponent,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    const token = this.cookie.get('access_token');
    if (!token) return;

    this.userService.fetchUserData(token).subscribe((user) => {
      this.userService.setUser(user);
    });
  }
}
