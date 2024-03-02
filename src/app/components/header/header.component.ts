import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SliderComponent } from './player/slider/slider.component';
import { PlayerComponent } from "./player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink, RouterLinkActive, SliderComponent, FormsModule, PlayerComponent, MatIconModule]
})
export class HeaderComponent {
  public color: string = '#3b82f6'

  constructor(public theme: ThemeService) { }

  ngOnInit() {
    if (localStorage.getItem('themeMode') === 'dark') {
      this.theme.toggleMode()
    }
  }

  toggleMode() {
    this.theme.toggleMode()
  }

  changeColor(newColor: string) {
    this.color = newColor
    this.theme.changeMainColor(newColor)
  }
}
