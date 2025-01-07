import { transition, style, animate, trigger, state } from "@angular/animations";

export const CLOSE_ANIMATION_TIME = 200

const enterStyles = [
  style({ scale: 0.9, opacity: 0 }),
  animate('.2s ease-in', style({ scale: 1, opacity: 1 })),
]

const exitStyles = [
  animate('.15s ease-out', style({ scale: 0.9, opacity: 0 })),
]

const enterTransition = transition(':enter', enterStyles);
const exitTransition = transition(':leave', exitStyles);
export const scaleInOut = trigger('scaleInOut', [enterTransition, exitTransition]);


export const manualSclaeInOut = trigger('manualSclaeInOut',
  [
    state('open', style({ scale: 0.9, opacity: 0 })),
    state('closed', style({ scale: 1, opacity: 1 })),
    transition('* => closed', [animate(`.${CLOSE_ANIMATION_TIME}s ease-in`, style({ scale: 1, opacity: 1 }))]),
    transition('* => open', [animate('.15s ease-out', style({ scale: 0.9, opacity: 0 }))]),
  ]
);