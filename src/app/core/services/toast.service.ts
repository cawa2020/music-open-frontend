import { Injectable, signal } from '@angular/core';
import { Message, MessageType } from '../../shared/interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messages = signal<Message[]>([]);

  getMessages(): Message[] {
    return this.messages()
  }

  removeLastMessage(): void {
    this.messages.update(messages => messages.slice(0, -1));
  }

  success(text: string): void {
    this.addMessage(text, 'success');
  }

  info(text: string): void {
    this.addMessage(text, 'info');
  }

  error(text: string): void {
    this.addMessage(text, 'error');
  }

  private addMessage(text: string, type: MessageType): void {
    const message = { info: text, type: type };
    this.messages.update(prev => prev.concat(message));
  }
}
