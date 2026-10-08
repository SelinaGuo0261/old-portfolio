import { gsap, $$ } from '../gsap';

/**
 * Click-to-expand panel:
 *   <div data-accordion>
 *     <button data-accordion-toggle>… <img data-accordion-icon></button>
 *     <div data-accordion-panel>…</div>
 *   </div>
 */
export function initAccordions(root: ParentNode = document): void {
  for (const el of $$('[data-accordion]', root)) {
    const toggle = el.querySelector<HTMLElement>('[data-accordion-toggle]');
    const panel = el.querySelector<HTMLElement>('[data-accordion-panel]');
    const icon = el.querySelector<HTMLElement>('[data-accordion-icon]');
    if (!toggle || !panel) continue;

    let open = false;
    gsap.set(panel, { height: 0, overflow: 'hidden' });
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      open = !open;
      toggle.setAttribute('aria-expanded', String(open));
      gsap.to(panel, { height: open ? 'auto' : 0, duration: 0.5, ease: 'power2.inOut' });
      if (icon) gsap.to(icon, { rotation: open ? 180 : 0, duration: 0.5 });
    });
  }
}
