import { gsap, $$, numAttr } from '../gsap';

/**
 * Magnetic element: follows the pointer while it is over the element.
 * `data-magnetic="50"` sets the max pull in px (default 50); a child
 * with `data-magnetic-inner` moves 40% as far for a parallax feel.
 */
export function initMagnetic(root: ParentNode = document): void {
  if (!window.matchMedia('(hover: hover)').matches) return;

  for (const el of $$('[data-magnetic]', root)) {
    const strength = numAttr(el, 'data-magnetic', 50);
    const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const ixTo = inner && gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' });
    const iyTo = inner && gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' });

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      // -1 … 1 across the element
      const px = ((e.clientX - r.left) / r.width) * 2 - 1;
      const py = ((e.clientY - r.top) / r.height) * 2 - 1;
      xTo(px * strength);
      yTo(py * strength);
      ixTo?.(px * strength * 0.4);
      iyTo?.(py * strength * 0.4);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0); yTo(0); ixTo?.(0); iyTo?.(0);
    });
  }
}
