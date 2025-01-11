export type ContextMenuItems = {
  title: string;
  event: () => void;
}

export interface ContextMenuEvent {
  id: string;
  items: ContextMenuItems[],
  position: Position,
  parent?: HTMLElement;
}

export interface Position {
  x: number,
  y: number
}
