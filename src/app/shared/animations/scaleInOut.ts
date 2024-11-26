import { transition, style, animate, trigger } from "@angular/animations";

const enterTransition = transition(':enter', [
  style({ scale: 0.9, opacity: 0 }),
  animate('.2s ease-in', style({ scale: 1, opacity: 1 })),
]);

const exitTransition = transition(':leave', [
  animate('.15s ease-out', style({ scale: 0.9, opacity: 0 })),
]);

export const scaleInOut = trigger('scaleInOut', [enterTransition, exitTransition]);
