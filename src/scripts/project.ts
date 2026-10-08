import { gsap, ScrollTrigger, $$ } from './gsap';

/** Tabs: builds the buttons from each panel's `data-tab-label`. */
function initTabs(): void {
  for (const tabs of $$('[data-tabs]')) {
    const list = tabs.querySelector<HTMLElement>('[role="tablist"]');
    const panels = $$<HTMLElement>('[data-tab-label]', tabs);
    if (!list || !panels.length) continue;

    const buttons = panels.map((panel, i) => {
      const id = `${tabs.closest('[data-project]')?.getAttribute('data-project') ?? 'tabs'}-tab-${i}`;
      panel.id = `${id}-panel`;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tabs__button';
      b.id = id;
      b.role = 'tab';
      b.textContent = panel.dataset.tabLabel ?? `Tab ${i + 1}`;
      b.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', id);
      list.append(b);
      return b;
    });

    const select = (index: number, animate = true) => {
      panels.forEach((panel, i) => {
        const on = i === index;
        buttons[i]!.setAttribute('aria-selected', String(on));
        buttons[i]!.tabIndex = on ? 0 : -1;
        panel.hidden = !on;
        if (on && animate) gsap.fromTo(panel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
      });
      ScrollTrigger.refresh();
    };
    buttons.forEach((b, i) => b.addEventListener('click', () => select(i)));
    const first = Number(tabs.dataset.active ?? 0);
    select(first >= 0 && first < panels.length ? first : 0, false);
  }
}

/** Side dots: one per <Divider>, highlighting the section in view. */
function initSectionNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-section-nav]');
  const anchors = $$<HTMLElement>('[data-section-anchor]');
  if (!nav || anchors.length < 2) return;

  const links = anchors.map((a) => {
    const text = a.textContent?.trim() ?? a.id;
    // Use the heading's leading emoji (e.g. "📱 Main Features") as the icon.
    const emoji = text.match(/^\p{Extended_Pictographic}(\uFE0F|\u200D\p{Extended_Pictographic})*/u)?.[0];
    const label = emoji ? text.slice(emoji.length).trim() : text;
    const link = document.createElement('a');
    link.href = `#${a.id}`;
    link.setAttribute('aria-label', label);
    link.append(emoji ?? '•');
    const tip = document.createElement('span');
    tip.className = 'section-nav__label';
    tip.textContent = label;
    link.append(tip);
    nav.append(link);
    return link;
  });

  anchors.forEach((a, i) => {
    ScrollTrigger.create({
      trigger: a,
      start: 'top center',
      endTrigger: anchors[i + 1] ?? 'main',
      end: anchors[i + 1] ? 'top center' : 'bottom bottom',
      onToggle: ({ isActive }) => links[i]!.classList.toggle('is-active', isActive),
    });
  });
}

/** Markdown images and paragraphs slide up too (like Webflow's "move-up"). */
function markReveals(): void {
  for (const el of $$('.prose > p, .prose > h3, .prose > h4, .prose .col > p > img, .prose .cell > p > img')) {
    if (!el.closest('[data-reveal]')) el.setAttribute('data-reveal', '');
  }
}

export function initProjectPage(): void {
  markReveals();
  initTabs();
  initSectionNav();
}
