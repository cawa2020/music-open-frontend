import { Directive, ElementRef, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSlidingText]',
  standalone: true
})
export class SlidingTextDirective implements OnInit {
  public changeObserver: MutationObserver | undefined

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.changeObserver = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => this.changeTransition());
    });

    const options: MutationObserverInit = {
      attributes: false,
      childList: false,
      subtree: true,
      characterData: true
    };

    this.changeObserver.observe(this.el.nativeElement, options);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    const parentWidth = this.el.nativeElement.parentElement.offsetWidth
    const elementWidth = this.el.nativeElement.offsetWidth
    if (parentWidth >= elementWidth) return
    const shift = parentWidth - elementWidth
    this.el.nativeElement.style.transform = `translateX(${shift}px)`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.transform = `translateX(0px)`;
  }

  private changeTransition() {
    const duration = Math.abs(this.el.nativeElement.parentElement.offsetWidth - this.el.nativeElement.offsetWidth) / 50
    this.el.nativeElement.style.transition = `transform ${duration}s linear`
  }
}
