import { gsap, ScrollTrigger, SplitText, $$ } from '../gsap';

/**
 * Text animations driven by `data-split="<effect>"`:
 *
 *   words-slide-up, words-rotate-in, words-slide-from-right,
 *   letters-slide-up, letters-slide-down, letters-fade-in,
 *   letters-fade-in-random, scrub-each-word
 *
 * Each plays when the element reaches 60% of the viewport and resets
 * when it scrolls back below the fold, so it replays next time.
 */
type Effect = (parts: { words: Element[]; chars: Element[] }) => gsap.core.Timeline;

const effects: Record<string, Effect> = {
  'words-slide-up': ({ words }) =>
    gsap.timeline({ paused: true }).from(words, {
      opacity: 0, yPercent: 100, duration: 0.6, ease: 'back.out(2)', stagger: { amount: 0.5 },
    }),
  'words-rotate-in': ({ words }) =>
    gsap.timeline({ paused: true })
      .set(words, { transformPerspective: 1000 })
      .from(words, { rotationX: -90, duration: 0.6, ease: 'power2.out', stagger: { amount: 0.6 } }),
  'words-slide-from-right': ({ words }) =>
    gsap.timeline({ paused: true }).from(words, {
      opacity: 0, x: '1em', duration: 0.6, ease: 'power2.out', stagger: { amount: 0.2 },
    }),
  'letters-slide-up': ({ chars }) =>
    gsap.timeline({ paused: true }).from(chars, {
      yPercent: 100, duration: 0.5, ease: 'power1.out', stagger: { amount: 0.5 },
    }),
  'letters-slide-down': ({ chars }) =>
    gsap.timeline({ paused: true }).from(chars, {
      yPercent: -120, duration: 0.5, ease: 'power1.out', stagger: { amount: 0.7 },
    }),
  'letters-fade-in': ({ chars }) =>
    gsap.timeline({ paused: true }).from(chars, {
      opacity: 0, duration: 0.4, ease: 'power1.out', stagger: { amount: 0.8 },
    }),
  'letters-fade-in-random': ({ chars }) =>
    gsap.timeline({ paused: true }).from(chars, {
      opacity: 0, duration: 0.1, ease: 'power1.out', stagger: { amount: 0.4, from: 'random' },
    }),
};

export function initTextSplits(root: ParentNode = document): void {
  for (const el of $$('[data-split]', root)) {
    const effect = el.dataset.split ?? '';
    const split = SplitText.create(el, { type: 'words,chars', wordsClass: 'word', charsClass: 'char' });
    gsap.set(el, { opacity: 1 });

    if (effect === 'scrub-each-word') {
      gsap.from(split.words, {
        opacity: 0.2, ease: 'power1.out', stagger: { each: 0.4 },
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top center', scrub: true },
      });
      continue;
    }

    const make = effects[effect];
    if (!make) continue;
    const tl = make({ words: split.words, chars: split.chars });
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      onLeaveBack: () => tl.progress(0).pause(),
    });
    ScrollTrigger.create({ trigger: el, start: 'top 60%', onEnter: () => tl.play() });
  }
}
