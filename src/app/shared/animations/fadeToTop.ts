import { transition, style, animate, trigger } from "@angular/animations";

const enterTransition = transition(':leave', [
  animate('.2s ease-out', style({ transform: 'translateY(-8px)', opacity: 0 })),
]);

export const fadeToTop = trigger('fadeToTop', [enterTransition]);
