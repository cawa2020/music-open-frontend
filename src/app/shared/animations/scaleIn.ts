import { transition, style, animate, trigger } from "@angular/animations";

const enterTransition = transition(':enter', [
  style({ transform: 'scale(0.9)', opacity: 0, color: 'red !important' }),
  animate('.2s ease-in', style({ transform: 'scale(1)', opacity: 1 })),
]);

export const scaleIn = trigger('scaleIn', [enterTransition]);
