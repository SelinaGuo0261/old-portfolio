import { $$ } from '../gsap';

/**
 * Lottie players: `<div data-lottie={url} data-lottie-loop>`.
 * Add `data-lottie-fill` to stretch the animation to the box.
 * lottie-web is loaded only on pages that use it.
 */
export async function initLotties(root: ParentNode = document): Promise<void> {
  const els = $$('[data-lottie]', root);
  if (!els.length) return;
  const { default: lottie } = await import('lottie-web/build/player/lottie_light');
  for (const el of els) {
    lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: el.hasAttribute('data-lottie-loop'),
      autoplay: true,
      path: el.dataset.lottie!,
      rendererSettings: {
        preserveAspectRatio: el.hasAttribute('data-lottie-fill') ? 'none' : 'xMidYMid meet',
      },
    });
  }
}
