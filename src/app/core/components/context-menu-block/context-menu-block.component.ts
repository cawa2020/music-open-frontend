import { Component, computed, ElementRef, HostListener, Signal, ViewChild } from '@angular/core';
import { ContextMenuService } from '../../services/context-menu.service';
import { ContextMenuEvent } from '../../../shared/interfaces/right-click.interface';

@Component({
  selector: 'app-context-menu-block',
  standalone: true,
  imports: [],
  templateUrl: './context-menu-block.component.html',
  styleUrl: './context-menu-block.component.css'
})
export class ContextMenuBlockComponent {
  public contextMenuEvent: Signal<ContextMenuEvent> = computed(() => this.contextMenuService.getEvent())
  @ViewChild('contextMenuBlock') contextMenuBlock: ElementRef | undefined

  constructor(private contextMenuService: ContextMenuService) { }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.contextMenuBlock) return
    if (!this.contextMenuBlock.nativeElement.contains(event.target)) {
      this.contextMenuService.close()
    }
  }
}
