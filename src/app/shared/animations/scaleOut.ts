import { transition, style, animate, trigger } from "@angular/animations";

const exitTransition = transition(':leave', [
  animate('.15s ease-out', style({ transform: 'scale(0.9)', opacity: 0 })),
]);

export const scaleOut = trigger('scaleOut', [exitTransition]);
