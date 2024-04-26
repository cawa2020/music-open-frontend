import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { DOCUMENT } from '@angular/common';
import { ControlsComponent } from '../components/controls/controls.component';

@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() tooltip!: string
  public tooltipComponent?: ComponentRef<any>

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document,
    private appReff: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.tooltipComponent = this.viewContainerRef.createComponent(TooltipComponent);
    this.setTooltipComponentProperties()
    this.document.body.appendChild(this.tooltipComponent.location.nativeElement)
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.tooltipComponent) return
    // this.tooltipComponent.destroy()
  }

  setTooltipComponentProperties() {
    if (!this.tooltipComponent) { return }
    this.tooltipComponent.instance.text = this.tooltip
    const { left, right, top } = this.el.nativeElement.getBoundingClientRect()
    console.log((right - left) / 2 + left)
    this.tooltipComponent.instance.left = (right - left) / 2 + left
    this.tooltipComponent.instance.top = top - 100
  }
}
