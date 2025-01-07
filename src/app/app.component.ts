import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { PlayerComponent } from './core/components/player/player.component';
import { UserService } from './core/services/user.service';
import { CookieService } from './core/services/cookie.service';
import { UserMusicComponent } from './core/components/user-music/user-music.component';
import { ToastsComponent } from './core/components/toasts/toasts.component';
import { ContextMenuBlockComponent } from "./core/components/context-menu-block/context-menu-block.component";
import { UserApiService } from './core/services/user-api.service';
import { AuthService } from './core/services/auth.service';
import { ModalComponent } from "./core/components/modal/modal.component";

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
    ContextMenuBlockComponent,
    ModalComponent
],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private userApiService: UserApiService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    const token = this.cookie.get('access_token');

    if (!token) {
      this.auth.setIsAuth(false)
      return
    };

    this.userApiService.fetchUserDataByToken(token).subscribe((user) => {
      this.auth.setIsAuth(true)
      this.userService.setUser(user);
    });
  }
}
