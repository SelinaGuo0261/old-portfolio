import { gsap, $$ } from '../gsap';

/**
 * Card stack (Case Study page).
 *
 *   <div data-stack>
 *     <div data-stack-card>…</div> × n      the photo cards
 *     <div data-stack-panel>…</div> × n     matching text panels
 *     <button data-stack-prev> / <button data-stack-next>
 *   </div>
 *
 * The front card flies off to the side and slides to the back; the
 * others shuffle forward. Arrow keys and horizontal swipes work too.
 */
export function initCardStacks(): void {
  for (const root of $$('[data-stack]')) {
    const cards = $$('[data-stack-card]', root);
    const panels = $$('[data-stack-panel]', root);
    const count = cards.length;
    if (!count) continue;

    let current = 0;
    let busy = false;

    // Position each card by its distance from the front.
    const layout = (animate: boolean) => {
      cards.forEach((card, i) => {
        const depth = (i - current + count) % count;
        const vars: gsap.TweenVars = {
          x: depth * -26,
          rotation: depth === 0 ? 0 : -2 - depth * 1.5,
          scale: 1 - depth * 0.05,
          opacity: depth > 3 ? 0 : 1,
          zIndex: count - depth,
        };
        if (animate) gsap.to(card, { ...vars, duration: 0.5, ease: 'power3.out' });
        else gsap.set(card, vars);
        card.setAttribute('aria-hidden', String(depth !== 0));
      });
      panels.forEach((p, i) => {
        p.hidden = i !== current;
      });
    };

    const go = (dir: 1 | -1) => {
      if (busy || count < 2) return;
      busy = true;
      const leaving = cards[current]!;
      const prevPanel = panels[current];
      current = (current + dir + count) % count;
      const nextPanel = panels[current];

      const tl = gsap.timeline({ onComplete: () => { busy = false; } });
      if (dir === 1) {
        tl.to(leaving, { x: 220, rotation: 12, opacity: 0, duration: 0.35, ease: 'power2.in' })
          .add(() => layout(true))
          .fromTo(leaving, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '>-0.1');
      } else {
        const incoming = cards[current]!;
        layout(true);
        tl.fromTo(incoming, { x: 220, rotation: 12, opacity: 0 }, { x: 0, rotation: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
      }
      if (prevPanel && nextPanel) {
        prevPanel.hidden = true;
        nextPanel.hidden = false;
        gsap.fromTo(nextPanel.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' });
      }
    };

    layout(false);
    root.querySelector('[data-stack-next]')?.addEventListener('click', () => go(1));
    root.querySelector('[data-stack-prev]')?.addEventListener('click', () => go(-1));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    });

    // Swipe / drag on the cards
    let startX: number | null = null;
    const deck = root.querySelector<HTMLElement>('[data-stack-deck]') ?? root;
    deck.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    window.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    });
    deck.addEventListener('click', (e) => {
      // Clicking the front card goes forward (links inside still work).
      if (!(e.target as HTMLElement).closest('a')) go(1);
    });
  }
}
