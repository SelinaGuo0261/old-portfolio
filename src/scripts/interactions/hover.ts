import { gsap, $$ } from '../gsap';

/**
 * Hover effects, opt-in with data attributes:
 *
 *   data-hover="spin"   child [data-hover-target] spins 360° on hover
 *   data-hover="fill"   child [data-hover-target] fills 0 → 100% height
 *   data-hover="slide"  child [data-hover-target] slides in from the left
 *   data-hover="jello"  the element wobbles once
 *   data-hover="flip"   3D card: [data-hover-target] turns in, [data-hover-push] shifts
 *   data-hover="reveal" child [data-hover-target] fades in
 */
export function initHovers(root: ParentNode = document): void {
  for (const el of $$('[data-hover]', root)) {
    const target = el.querySelector<HTMLElement>('[data-hover-target]') ?? el;
    const kind = el.dataset.hover;

    switch (kind) {
      case 'spin':
        el.addEventListener('mouseenter', () =>
          gsap.fromTo(target, { rotation: 0 }, { rotation: 360, duration: 1, ease: 'power1.inOut', overwrite: true }));
        el.addEventListener('mouseleave', () => gsap.set(target, { rotation: 0, overwrite: true }));
        break;

      case 'fill':
        gsap.set(target, { height: '0%' });
        el.addEventListener('mouseenter', () => gsap.to(target, { height: '100%', duration: 0.3, ease: 'power3.out', overwrite: true }));
        el.addEventListener('mouseleave', () => gsap.to(target, { height: '0%', duration: 0.3, ease: 'power3.inOut', overwrite: true }));
        break;

      case 'slide':
        gsap.set(target, { xPercent: -101 });
        el.addEventListener('mouseenter', () => gsap.to(target, { xPercent: 0, duration: 0.5, ease: 'power1.inOut', overwrite: true }));
        el.addEventListener('mouseleave', () => gsap.to(target, { xPercent: -101, duration: 0.5, ease: 'power1.inOut', overwrite: true }));
        break;

      case 'jello':
        el.addEventListener('mouseenter', () => {
          gsap.timeline({ overwrite: true })
            .to(el, { skewX: -12, skewY: -12, duration: 0.15 })
            .to(el, { skewX: 6, skewY: 6, duration: 0.15 })
            .to(el, { skewX: -3, skewY: -3, duration: 0.15 })
            .to(el, { skewX: 0, skewY: 0, duration: 0.3, ease: 'power2.out' });
        });
        break;

      case 'flip': {
        const push = el.querySelector<HTMLElement>('[data-hover-push]');
        gsap.set(target, { rotationY: -90, transformPerspective: 1000 });
        el.addEventListener('mouseenter', () => {
          gsap.to(target, { rotationY: 0, duration: 0.5, ease: 'power2.out', overwrite: true });
          if (push) gsap.to(push, { xPercent: 50, duration: 0.5, ease: 'power2.out', overwrite: true });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(target, { rotationY: -90, duration: 0.5, ease: 'power2.inOut', overwrite: true });
          if (push) gsap.to(push, { xPercent: 0, duration: 0.5, ease: 'power2.inOut', overwrite: true });
        });
        break;
      }

      case 'reveal':
        gsap.set(target, { opacity: 0 });
        el.addEventListener('mouseenter', () => gsap.to(target, { opacity: 1, duration: 0.5, overwrite: true }));
        el.addEventListener('mouseleave', () => gsap.to(target, { opacity: 0, duration: 0.5, overwrite: true }));
        break;
    }
  }
}
