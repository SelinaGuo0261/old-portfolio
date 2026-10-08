import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** True when the visitor asked the OS for less motion. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** querySelectorAll as a typed array. */
export function $$<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** Read a numeric data attribute, falling back to `fallback`. */
export function numAttr(el: Element, name: string, fallback: number): number {
  const v = Number.parseFloat(el.getAttribute(name) ?? '');
  return Number.isFinite(v) ? v : fallback;
}

export { gsap, ScrollTrigger, SplitText };
