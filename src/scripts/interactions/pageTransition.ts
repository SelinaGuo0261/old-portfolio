import { gsap, $$ } from '../gsap';

/**
 * Links with `data-transition` sweep a panel over the screen before
 * navigating (the old "Outro" interaction).
 */
export function initPageTransitions(): void {
  const links = $$<HTMLAnchorElement>('a[data-transition]');
  if (!links.length) return;

  const panel = document.createElement('div');
  panel.className = 'page-transition';
  panel.setAttribute('aria-hidden', 'true');
  document.body.append(panel);
  gsap.set(panel, { scaleY: 0 });

  for (const link of links) {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || link.target === '_blank') return;
      e.preventDefault();
      gsap.timeline({ onComplete: () => { window.location.href = link.href; } })
        .set(panel, { transformOrigin: 'bottom' })
        .to(panel, { scaleY: 1, duration: 0.8, ease: 'power3.inOut' });
    });
  }
  // Coming back via the browser's back button: hide the panel again.
  window.addEventListener('pageshow', () => gsap.set(panel, { scaleY: 0 }));
}
