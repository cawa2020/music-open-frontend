import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() size?: 'big' | 'medium' | 'small' = 'medium'

  get fontSize() {
    switch (this.size) {
      case 'big': return '2rem'
      case 'medium': return '1.5rem'
      case 'small': default: return '1rem'
    }
  }
}
