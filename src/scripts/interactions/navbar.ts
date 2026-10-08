import { gsap, ScrollTrigger } from '../gsap';

/**
 * Navbar: slides up out of view while scrolling down, back in when
 * scrolling up. The "overlay" variant (home page) also switches from
 * transparent to solid once the hero has scrolled away.
 */
export function initNavbar(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  let hidden = false;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      const pastTop = self.scroll() > nav.offsetHeight;
      const shouldHide = self.direction === 1 && pastTop && !nav.classList.contains('is-open');
      if (shouldHide === hidden) return;
      hidden = shouldHide;
      // yPercent (not a pixel offset) so the bar stays fully hidden even if
      // its height changes while it is up, e.g. when it turns solid.
      gsap.to(nav, {
        yPercent: shouldHide ? -100 : 0,
        duration: shouldHide ? 0.7 : 0.5,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    },
  });

  if (nav.dataset.nav === 'overlay') {
    const hero = document.querySelector<HTMLElement>('[data-nav-hero]');
    const setSolid = (solid: boolean) => {
      nav.classList.toggle('is-solid', solid);
      gsap.to(nav, { backgroundColor: solid ? '#f7f8fa' : 'rgba(229,229,229,0)', duration: 0.5, overwrite: 'auto' });
    };
    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'bottom top+=80',
        onEnter: () => setSolid(true),
        onLeaveBack: () => setSolid(false),
      });
    } else {
      setSolid(true);
    }
  }

  // Mobile menu
  const toggle = nav.querySelector<HTMLButtonElement>('.nav__toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    if (open) gsap.to(nav, { yPercent: 0, duration: 0.3, overwrite: 'auto' });
  });
}
