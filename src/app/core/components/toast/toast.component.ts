import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  Message,
  MessageType,
} from '../../../shared/interfaces/message.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToastComponent implements OnInit {
  public messages: Message[] = [];

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.toast.changes$.subscribe((newMessage) => {
      this.messages.push(newMessage);
    });
  }

  getIcon(type: MessageType) {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'info':
        return 'information-circle';
      default:
        return '';
    }
  }

  getStyles(type: MessageType, index: number) {
    const styles: any = {};
    switch (type) {
      case 'success':
        styles.backgroundColor = 'hsl(143, 85%, 96%)';
        styles.color = 'hsl(140, 100%, 27%)';
        styles.borderColor = 'hsl(145, 92%, 91%)';
        break;
      case 'error':
      case 'info':
      default:
    }
    styles.top = index * 55 + 20 + 'px';
    return styles;
  }
}
