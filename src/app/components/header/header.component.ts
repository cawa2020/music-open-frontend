import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SliderComponent } from './player/slider/slider.component';
import { PlayerService } from '../../services/player.service';
import { PlayerComponent } from "./player/player.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink, RouterLinkActive, SliderComponent, FormsModule, PlayerComponent, MatIconModule]
})
export class HeaderComponent {

}
