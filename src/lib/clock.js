// Momento en el que la página actual queda "a la vista" (tras la intro
// o tras la transición). Las animaciones de entrada esperan a él.
let enterAt = 0;

export const INTRO_MS = 1700;
export const PAGE_IN_MS = 120;

export function setEnterIn(ms) {
  enterAt = performance.now() + ms;
}

export function enterDelay() {
  return Math.max(0, (enterAt - performance.now()) / 1000);
}

export const EASE = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.87, 0, 0.13, 1];
