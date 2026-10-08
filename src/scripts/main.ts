import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';
import { initNavbar } from './interactions/navbar';
import { initReveals } from './interactions/reveal';
import { initTextSplits } from './interactions/textSplit';
import { initHovers } from './interactions/hover';
import { initMagnetic } from './interactions/magnetic';
import { initFloat } from './interactions/float';
import { initAccordions } from './interactions/accordion';
import { initTimeline } from './interactions/timeline';
import { initLotties } from './interactions/lottie';
import { initClocks } from './interactions/clock';

/**
 * Runs on every page (called from BaseLayout). Deferred one frame so
 * page-specific scripts can tag elements (data-reveal etc.) first.
 */
export function initSite(): void {
  requestAnimationFrame(init);
}

function init(): void {
  initNavbar();
  initAccordions();
  initClocks();
  void initLotties();

  if (prefersReducedMotion()) {
    // Show everything immediately, no motion.
    gsap.set('[data-split]', { opacity: 1 });
    return;
  }

  initReveals();
  initTextSplits();
  initHovers();
  initMagnetic();
  initFloat();
  initTimeline();

  // Images load after layout; recompute trigger positions once they do.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
