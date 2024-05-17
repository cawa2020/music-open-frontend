export interface Message {
  info: string;
  type: MessageType;
}

export type MessageType = 'success' | 'info' | 'error';
