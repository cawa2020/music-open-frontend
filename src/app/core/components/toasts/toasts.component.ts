import { transition, style, animate, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { toastLifeTime } from '../../../shared/constants/toast.constant';
import { Message } from '../../../shared/interfaces/message.interface';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../toast/toast.component';

const enterTransition = transition(':enter', [
  style({ transform: 'translateY(-80px)', opacity: 0 }),
  animate('.15s ease-in', style({ transform: 'translateY(0px)', opacity: 1 })),
]);
const exitTransition = transition(':leave', [
  animate('.15s ease-out', style({ transform: 'translateY(8px)', opacity: 0 })),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css',
  animations: [fadeIn, fadeOut],
})
export class ToastsComponent {
  public messages: Message[] = [];

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.toast.changes$.subscribe((newMessage) => {
      this.messages.push(newMessage);
      setTimeout(() => {
        this.messages.shift();
      }, toastLifeTime);
    });
  }
}
