import { gsap, $$, numAttr } from '../gsap';

/**
 * Gentle bobbing. `data-float` moves ±5px; `data-float-delay="0.2"`
 * offsets the start so neighbours don't move in lockstep.
 */
export function initFloat(root: ParentNode = document): void {
  for (const el of $$('[data-float]', root)) {
    const amount = numAttr(el, 'data-float', 5);
    gsap.fromTo(el, { y: -amount }, {
      y: amount,
      duration: 2,
      delay: numAttr(el, 'data-float-delay', 0),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }
}
