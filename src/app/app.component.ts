import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { PlayerComponent } from './core/components/player/player.component';
import { UserMusicComponent } from './core/components/user-music/user-music.component';
import { ToastsComponent } from './core/components/toasts/toasts.component';
import { ContextMenuBlockComponent } from "./core/components/context-menu-block/context-menu-block.component";
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
export class AppComponent { }
