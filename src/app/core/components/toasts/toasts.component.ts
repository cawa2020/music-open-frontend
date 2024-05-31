import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { toastLifeTime } from '../../../shared/constants/toast.constant';
import { Message, MessageType } from '../../../shared/interfaces/message.interface';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { fadeIn } from '../../../shared/animations/fadeIn';
import { fadeOut } from '../../../shared/animations/fadeOut';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css',
  animations: [fadeIn, fadeOut],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToastsComponent {
  public messages: Message[] = [];

  constructor(private toast: ToastService) { }

  ngOnInit() {
    this.toast.changes$.subscribe((newMessage) => {
      this.messages.push(newMessage);
      setTimeout(() => {
        this.messages.shift();
      }, toastLifeTime);
    });
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
}
