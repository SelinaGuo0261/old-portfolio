import { gsap, $$, numAttr } from '../gsap';

/**
 * Scroll-in reveals. Add `data-reveal` to any element:
 *
 *   data-reveal            move up 50px + fade in (the old "move-up")
 *   data-reveal="left"     slide in from the left
 *   data-reveal="right"    slide in from the right
 *   data-reveal="bottom"   slide in from below
 *   data-reveal="grow"     scale up from nothing
 *   data-reveal="drop"     drop in from above
 *   data-reveal="fade"     fade in only
 *   data-reveal="heading"  slide up from behind a mask (parent clips it)
 *
 * Optional: data-reveal-delay="0.2" (seconds).
 */
type Preset = { from: gsap.TweenVars; to: gsap.TweenVars };

const presets: Record<string, Preset> = {
  up: {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: 'power2.inOut' },
  },
  left: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
  },
  right: {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
  },
  bottom: {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
  },
  grow: {
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
  },
  drop: {
    from: { y: -100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' },
  },
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 1, ease: 'power1.in' },
  },
  heading: {
    from: { yPercent: 110 },
    to: { yPercent: 0, duration: 0.6, ease: 'power3.inOut' },
  },
};

export function initReveals(root: ParentNode = document): void {
  for (const el of $$('[data-reveal]', root)) {
    const preset = presets[el.dataset.reveal || 'up'] ?? presets.up!;
    gsap.fromTo(el, preset.from, {
      ...preset.to,
      delay: numAttr(el, 'data-reveal-delay', 0),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  }
}
