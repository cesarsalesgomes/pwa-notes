import { keyframes, style } from '@angular/animations';

export const slideOutLeft = [
  style({
    transform: 'translate3d(0, 0, 0)',
    offset: 0.0
  }),
  style({
    transform: 'translate3d(-100%, 0, 0)',
    visibility: 'hidden',
    offset: 1.0
  })
];

export const slideOutRight = [
  style({
    transform: 'translate3d(0, 0, 0)',
    offset: 0.0
  }),
  style({
    transform: 'translate3d(100%, 0, 0)',
    visibility: 'hidden',
    offset: 1.0
  })
];
