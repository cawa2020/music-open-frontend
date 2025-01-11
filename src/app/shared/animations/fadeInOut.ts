import { transition, style, animate, trigger, state } from "@angular/animations";
import { CLOSE_ANIMATION_TIME } from "./scaleInOut";

const enterTransition = transition(':enter', [
  style({ transform: 'translateY(-8px)', opacity: 0 }),
  animate('.2s ease-in', style({ transform: 'translateY(0px)', opacity: 1 })),
]);

const exitTransition = transition(':leave', [
  animate('.15s ease-out', style({ transform: 'translateY(8px)', opacity: 0 })),
]);

export const fadeInOut = trigger('fadeInOut', [enterTransition, exitTransition]);

export const manualFadeInOut = trigger('manualFadeInOut',
  [
    state('open', style({ opacity: 0 })),
    state('closed', style({ opacity: 1 })),
    transition('* => closed', [animate(`.${CLOSE_ANIMATION_TIME}s ease-in`, style({ opacity: 1 }))]),
    transition('* => open', [animate('.15s ease-out', style({ opacity: 0 }))]),
  ]
);