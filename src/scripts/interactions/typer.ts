import { $$ } from '../gsap';

/**
 * Typewriter: `<span data-typer='[{"word":"SELINA","color":"#b984fd"}]'>`.
 * Types each word, waits, deletes it, moves to the next, forever.
 */
export function initTypers(): void {
  for (const el of $$('[data-typer]')) {
    const words = JSON.parse(el.dataset.typer ?? '[]') as { word: string; color?: string }[];
    if (!words.length) continue;
    const typeDelay = 100;
    const holdDelay = 1000;
    let w = 0;
    let n = 0;
    let deleting = false;

    const tick = () => {
      const { word, color } = words[w]!;
      if (color) el.style.color = color;
      n += deleting ? -1 : 1;
      el.textContent = word.slice(0, n);
      let wait = deleting ? typeDelay / 2 : typeDelay;
      if (!deleting && n === word.length) {
        deleting = true;
        wait = holdDelay * 2;
      } else if (deleting && n === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        wait = holdDelay / 2;
      }
      window.setTimeout(tick, wait);
    };
    el.textContent = '';
    tick();
  }
}
