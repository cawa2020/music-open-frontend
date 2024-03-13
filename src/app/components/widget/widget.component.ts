import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [RouterLink, SliderComponent, FormsModule, MatIconModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false

  constructor(public theme: ThemeService) { }

  ngOnInit() {
    if (localStorage.getItem('themeMode') === 'dark') {
      this.theme.toggleMode()
    }

    this.changeColor(this.color)
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  toggleMode() {
    this.theme.toggleMode()
  }

  changeColor(newColor: string) {
    this.color = newColor
    this.theme.changeMainColor(newColor)
    localStorage.setItem('mainColor', newColor)
  }
}
