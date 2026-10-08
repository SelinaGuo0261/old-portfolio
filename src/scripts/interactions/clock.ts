import { $$ } from '../gsap';

/** Live clock: `<span data-clock="America/Los_Angeles">`. */
export function initClocks(root: ParentNode = document): void {
  const els = $$('[data-clock]', root);
  if (!els.length) return;
  const tick = () => {
    const now = new Date();
    for (const el of els) {
      el.textContent = now.toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: el.dataset.clock || undefined, timeZoneName: 'short',
      });
    }
  };
  tick();
  window.setInterval(tick, 1000);
}
