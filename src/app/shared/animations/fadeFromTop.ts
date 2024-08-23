import { transition, style, animate, trigger } from "@angular/animations";

const enterTransition = transition(':enter', [
  style({ opacity: 0, transform: 'translateY(-8px)' }),
  animate('.2s ease-in', style({ transform: 'translateY(0px)', opacity: 1 })),
]);

export const fadeFromTop = trigger('fadeFromTop', [enterTransition]);
