import { transition, style, animate, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { Message } from '../../../shared/interfaces/message.interface';

const enterTransition = transition(':enter', [
  style({ transform: 'translateY(-8px)', opacity: 0 }),
  animate('.15s ease-in', style({ transform: 'translateY(0px)', opacity: 1 })),
]);
const exitTransition = transition(':leave', [
  animate('.15s ease-out', style({ transform: 'translateY(8px)', opacity: 0 })),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-toast',
  standalone: true,
  animations: [fadeIn, fadeOut],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  @Input() index!: number;
  @Input() message!: Message;

  get icon() {
    switch (this.message.type) {
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

  get styles() {
    const styles: any = {};
    switch (this.message.type) {
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
    styles.bottom = `${this.index * 55 + 112}px`;
    return styles;
  }

  onClick() {
    // this.messages.splice(index, 1);
  }
}
