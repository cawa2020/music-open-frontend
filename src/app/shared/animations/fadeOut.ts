import { transition, style, animate, trigger } from "@angular/animations";

const exitTransition = transition(':leave', [
    animate('.15s ease-out', style({ transform: 'translateY(8px)', opacity: 0 })),
]);

export const fadeOut = trigger('fadeOut', [exitTransition]);