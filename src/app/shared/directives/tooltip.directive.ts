import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit {
  @Input() tooltip: string = ''

  constructor(
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.el.nativeElement.classList.add('tooltip')
    this.el.nativeElement.setAttribute('tooltipText', this.tooltip)
  }
}
