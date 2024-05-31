import { transition, style, animate, trigger } from "@angular/animations";

const enterTransition = transition(':enter', [
    style({ transform: 'translateY(-8px)', opacity: 0 }),
    animate('.2s ease-in', style({ transform: 'translateY(0px)', opacity: 1 })),
]);

export const fadeIn = trigger('fadeIn', [enterTransition]);