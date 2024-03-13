import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  @Input() shape: 'circle' | 'rounded' | undefined
  @Input() width?: string
  @Input() height?: string
  @Input() styleClass?: string
  public styles: any = {
    backgroundColor: 'var(--bg-color-secondary)',
    width: '100%',
    height: '100%'
  }

  ngOnChanges(changes: SimpleChange) {
    if (this.shape === 'circle') {
      this.styles.borderRadius = '999999px'
    } else if (this.shape === 'rounded') {
      this.styles.borderRadius = 'var(--border-radius)'
    }

    this.styles.width = this.width
    this.styles.height = this.height
  }
}
