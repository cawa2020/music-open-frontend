import { Component, computed, ElementRef, HostListener, Signal, ViewChild } from '@angular/core';
import { ContextMenuService } from '../../services/context-menu.service';
import { ContextMenuEvent } from '../../../shared/interfaces/right-click.interface';
import { fadeInOut } from '../../../shared/animations/fadeInOut';

const block_width = 240

@Component({
  selector: 'app-context-menu-block',
  standalone: true,
  imports: [],
  templateUrl: './context-menu-block.component.html',
  styleUrl: './context-menu-block.component.css',
  animations: [
    fadeInOut,
  ]
})
export class ContextMenuBlockComponent {
  public contextMenuEvent: Signal<ContextMenuEvent> = computed(() => {
    const event = this.contextMenuService.getEvent()
    if (!event) return event
    if (event.position[0] + block_width > window.innerWidth) {
      event.position[0] = event.position[0] - block_width / 1.5
    }

    const parent_padding = 20
    if (event.position[1] + event.items.length * 40 + parent_padding > window.innerHeight) {
      event.position[1] = event.position[1] - event.items.length * 40 - 94
    }
    return event
  })
  @ViewChild('contextMenuBlock') contextMenuBlock: ElementRef | undefined

  constructor(private contextMenuService: ContextMenuService) { }

  onClick(func: () => void): void {
    func()
    this.contextMenuService.close()
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.contextMenuBlock) return
    if (!this.contextMenuBlock.nativeElement.contains(event.target) && !this.contextMenuService.getEvent().parent?.contains(event.target)) {
      this.contextMenuService.close()
    }
  }
}
