import { CUSTOM_ELEMENTS_SCHEMA, Component, effect } from '@angular/core';
import { toastLifeTime } from '../../../shared/constants/toast.constant';
import { Message, MessageType } from '../../../shared/interfaces/message.interface';
import { ToastService } from '../../services/toast.service';
import { fadeIn } from '../../../shared/animations/fadeIn';
import { fadeOut } from '../../../shared/animations/fadeOut';

@Component({
  selector: 'app-toasts',
  standalone: true,
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css',
  animations: [fadeIn, fadeOut]
})
export class ToastsComponent {
  public messages: Message[] = [];

  constructor(private toast: ToastService) {
    effect(() => {
      this.messages = this.toast.getMessages()
      if (!this.messages.length) return
      setTimeout(() => {
        this.messages.shift();
      }, toastLifeTime);
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
    styles.bottom = `${index * 55 + 112}px`;
    return styles;
  }
}
