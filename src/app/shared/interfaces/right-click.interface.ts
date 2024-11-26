export type ContextMenuItems = {
  title: string;
  event: () => void;
}

export interface ContextMenuEvent {
  items: ContextMenuItems[],
  position: number[]
}
