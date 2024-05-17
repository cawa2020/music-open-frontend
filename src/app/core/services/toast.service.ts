import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Message,
  MessageType,
} from '../../shared/interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messages: Message[] = [];
  public changes$ = new Subject<Message>();

  constructor() {}

  success(text: string) {
    this.addMessage(text, 'success');
  }

  info(text: string) {
    this.addMessage(text, 'info');
  }

  error(text: string) {
    this.addMessage(text, 'error');
  }

  private addMessage(text: string, type: MessageType) {
    const message: Message = { info: text, type: type };
    this.messages.push(message);
    this.changes$.next(message);
  }
}
