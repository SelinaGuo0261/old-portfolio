import { gsap } from '../gsap';

/**
 * Custom cursor: a ring that trails the pointer and grows over links.
 * Enabled on pages that include `<div data-cursor>`.
 */
export function initCursor(): void {
  const el = document.querySelector<HTMLElement>('[data-cursor]');
  if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    el?.remove();
    return;
  }
  document.documentElement.classList.add('has-cursor');
  gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
  const x = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3.out' });
  const y = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3.out' });

  window.addEventListener('pointermove', (e) => {
    x(e.clientX);
    y(e.clientY);
    gsap.to(el, { opacity: 1, duration: 0.2, overwrite: 'auto' });
  });
  document.addEventListener('pointerleave', () => gsap.to(el, { opacity: 0, duration: 0.2 }));
  document.addEventListener('pointerover', (e) => {
    const interactive = (e.target as HTMLElement).closest('a, button, [data-stack-deck]');
    gsap.to(el, { scale: interactive ? 2.2 : 1, duration: 0.3, ease: 'power2.out' });
  });
}
