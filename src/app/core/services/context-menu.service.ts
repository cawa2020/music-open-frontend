import { Injectable, Signal, signal } from '@angular/core';
import { ContextMenuEvent } from '../../shared/interfaces/right-click.interface';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private event = signal<ContextMenuEvent>({ items: [], position: [0, 0] });

  getEvent(): ContextMenuEvent {
    return this.event()
  }

  open(info: ContextMenuEvent): void {
    this.event.update(() => info)
  }

  close(): void {
    this.event.set({ items: [], position: [0, 0] })
  }
}
