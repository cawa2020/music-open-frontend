import { transition, style, animate, trigger, keyframes } from "@angular/animations";

const enterTransition = transition(':enter', [
  style({ transform: 'scale(1.2)' }),
  animate('.3s ease-in', style({ transform: 'scale(1)' })),
]);

export const beating = trigger('beating', [enterTransition]);
