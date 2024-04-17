import { Component, Input, SimpleChange } from '@angular/core';
type Shape = 'circle' | 'rounded'

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  @Input({ transform: appendPx }) width?: string
  @Input({ transform: appendPx }) height?: string
  @Input() shape!: Shape;

  public styles: any = {
    backgroundColor: 'var(--bg-color-secondary)',
    width: '100%',
    height: '100%'
  }

  ngOnChanges() {
    if (this.shape === 'circle') {
      this.styles.borderRadius = '999999px'
    } else if (this.shape === 'rounded') {
      this.styles.borderRadius = 'var(--border-radius)'
    }
    this.styles.width = this.width
    this.styles.height = this.height
  }
}

function appendPx(value: string): string {
  return value + 'px'
}
