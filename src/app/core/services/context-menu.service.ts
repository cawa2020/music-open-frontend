import { Injectable, Signal, signal } from '@angular/core';
import { ContextMenuEvent } from '../../shared/interfaces/right-click.interface';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private event = signal<ContextMenuEvent>({ id: '', items: [], position: [0, 0] });

  getEvent(): ContextMenuEvent {
    return this.event()
  }

  open(info: ContextMenuEvent): void {
    this.event.update(() => info)
  }

  close(): void {
    console.log(1)
    this.event.set({ id: '', items: [], position: [0, 0] })
  }
}
