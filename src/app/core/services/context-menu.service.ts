import { Injectable, Signal, signal } from '@angular/core';
import { ContextMenuEvent } from '../../shared/interfaces/right-click.interface';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private event = signal<ContextMenuEvent | null>(null);

  getEvent(): ContextMenuEvent {
    const emptyEvent = { id: '', items: [], position: [0, 0] }
    return this.event() ?? emptyEvent
  }

  open(info: ContextMenuEvent): void {
    this.event.update(() => info)
  }

  close(): void {
    this.event.set(null)
  }
}
