import { Component, effect } from '@angular/core';
import { TOAST_LIFE_TIME } from '../../../shared/constants/toast.constant';
import { Message, MessageType } from '../../../shared/interfaces/message.interface';
import { ToastService } from '../../services/toast.service';
import { fadeInOut } from '../../../shared/animations/fadeInOut';

@Component({
  selector: 'app-toasts',
  standalone: true,
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css',
  animations: [fadeInOut]
})
export class ToastsComponent {
  public messages: Message[] = [];

  constructor(private toast: ToastService) {
    effect(() => {
      this.messages = this.toast.getMessages()
      if (!this.messages.length) return
      setTimeout(() => {
        this.messages.shift();
      }, TOAST_LIFE_TIME);
    })
  }

  getStyles(index: number, type: MessageType) {
    const styles: any = {};
    switch (type) {
      case 'success':
        styles.backgroundColor = 'hsl(143, 85%, 96%)';
        styles.color = 'hsl(140, 100%, 27%)';
        styles.borderColor = 'hsl(145, 92%, 91%)';
        break;
      case 'error':
        styles.backgroundColor = 'hsl(359, 100%, 97%)';
        styles.color = 'hsl(360, 100%, 45%)';
        styles.borderColor = 'hsl(359, 100%, 94%)';
        break;
      case 'info':
        styles.backgroundColor = 'hsl(208, 100%, 97%)';
        styles.color = 'hsl(210, 92%, 45%)';
        styles.borderColor = 'hsl(221, 91%, 91%)';
        break;
      default:
    }

    const TOAST_ITEM_HEIGHT = 55
    const BOTTOM_MARGIN = 82 + 4 + 4 + 4

    styles.bottom = `${index * TOAST_ITEM_HEIGHT + BOTTOM_MARGIN}px`;
    return styles;
  }
}
