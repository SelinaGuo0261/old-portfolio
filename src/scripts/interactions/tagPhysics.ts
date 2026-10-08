import Matter from 'matter-js';

export interface TagSprite {
  src: string;
  width: number;
  height: number;
  url?: string;
}

/**
 * Pills that fall into a box and can be thrown around with the mouse.
 * The simulation starts the first time the container scrolls into view.
 */
export function initTagPhysics(container: HTMLElement, tags: TagSprite[]): void {
  const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter;
  let cleanup: (() => void) | null = null;

  const start = () => {
    cleanup?.();
    const width = container.clientWidth;
    const height = container.clientHeight;
    // Shrink tags on narrow screens so they all fit.
    const scale = Math.min(1, width / 1100);

    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    const render = Render.create({
      element: container,
      engine,
      options: { width, height, background: 'transparent', wireframes: false, pixelRatio: window.devicePixelRatio || 1 },
    });

    const wall = { isStatic: true, render: { visible: false } };
    const t = 200;
    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + t / 2, width * 2, t, wall),
      Bodies.rectangle(-t / 2, height / 2, t, height * 3, wall),
      Bodies.rectangle(width + t / 2, height / 2, t, height * 3, wall),
    ]);

    const bodies = tags.map((tag, i) => {
      const w = tag.width * scale;
      const h = tag.height * scale;
      const x = w / 2 + Math.random() * Math.max(1, width - w);
      const y = -h - i * 70; // drop in one after another
      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: h / 2 },
        restitution: 0.4,
        friction: 0.3,
        angle: (Math.random() - 0.5) * 0.8,
        render: { sprite: { texture: tag.src, xScale: scale, yScale: scale } },
      });
      (body as Matter.Body & { url?: string }).url = tag.url;
      return body;
    });
    Composite.add(engine.world, bodies);

    const mouse = Mouse.create(render.canvas);
    const drag = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    // Let the page scroll when the wheel is used over the canvas.
    const m = mouse as Matter.Mouse & { mousewheel?: EventListener; element: HTMLElement };
    if (m.mousewheel) {
      m.element.removeEventListener('wheel', m.mousewheel);
      m.element.removeEventListener('mousewheel', m.mousewheel);
      m.element.removeEventListener('DOMMouseScroll', m.mousewheel);
    }
    Composite.add(engine.world, drag);
    render.mouse = mouse;

    // A quick click (no drag) on a linked tag opens its URL.
    let downAt = 0;
    Matter.Events.on(drag, 'mousedown', () => { downAt = performance.now(); });
    Matter.Events.on(drag, 'mouseup', (e: Matter.IEvent<Matter.MouseConstraint>) => {
      if (performance.now() - downAt > 200) return;
      const hit = Matter.Query.point(bodies, e.source.mouse.position)[0] as (Matter.Body & { url?: string }) | undefined;
      if (hit?.url) window.open(hit.url, '_blank', 'noopener');
    });

    // Give tags a nudge when they're far off-screen (e.g. after resize).
    Matter.Events.on(engine, 'afterUpdate', () => {
      for (const b of bodies) if (b.position.y > height + 300) Body.setPosition(b, { x: width / 2, y: -100 });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    cleanup = () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  };

  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      start();
      io.disconnect();
    }
  });
  io.observe(container);

  let lastWidth = container.clientWidth;
  let timer = 0;
  window.addEventListener('resize', () => {
    if (!cleanup || Math.abs(container.clientWidth - lastWidth) < 40) return;
    lastWidth = container.clientWidth;
    window.clearTimeout(timer);
    timer = window.setTimeout(start, 250);
  });
}
