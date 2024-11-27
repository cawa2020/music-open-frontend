export type ContextMenuItems = {
  title: string;
  event: () => void;
}

export interface ContextMenuEvent {
  id: string;
  items: ContextMenuItems[],
  position: number[]
  parent?: HTMLElement;
}
