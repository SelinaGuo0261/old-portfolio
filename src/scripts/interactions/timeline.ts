import { gsap, $$ } from '../gsap';

/**
 * Vertical timeline (About page). Each `[data-timeline-item]` lights up
 * as it crosses the middle of the screen: its dot darkens and its
 * `[data-timeline-side]` columns go from 25% to full opacity.
 */
export function initTimeline(root: ParentNode = document): void {
  for (const item of $$('[data-timeline-item]', root)) {
    const dot = item.querySelector('[data-timeline-dot]');
    const sides = item.querySelectorAll('[data-timeline-side]');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: item, start: 'top 55%', end: 'top 45%', scrub: true },
    });
    if (dot) tl.fromTo(dot, { backgroundColor: '#414141' }, { backgroundColor: '#000', ease: 'none' }, 0);
    if (sides.length) tl.fromTo(sides, { opacity: 0.25 }, { opacity: 1, ease: 'none' }, 0);
  }
}
