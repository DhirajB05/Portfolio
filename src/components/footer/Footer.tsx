import { useEffect, useLayoutEffect, useRef } from 'react';

import { paint } from 'ascii-magic-art/runtime/canvas.js';
import create, { meta } from 'ascii-magic-art/pieces/cliff-lighthouse-night.js';

import './Footer.css';

/**
 * Full-bleed ASCII lighthouse footer.
 *
 * The canvas renderer, ink color, and background are fixed so the footer stays
 * visually identical when the site theme changes.
 */
const CM_PX = 96 / 2.54;
const ART_HEIGHT = 4 * CM_PX;
const FALLBACK_WIDTH = ART_HEIGHT * (meta.cols / meta.rows);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const widthRef = useRef(FALLBACK_WIDTH);
  const redrawRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const update = () => {
      const banner = document.querySelector<HTMLImageElement>('[data-hero-banner]');
      const measured = banner?.getBoundingClientRect().width ?? 0;
      const width = measured > 0 ? measured : footer.clientWidth;

      widthRef.current = width;
      footer.style.setProperty('--banner-width', `${width}px`);
      redrawRef.current?.();
    };

    update();

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    const banner = document.querySelector('[data-hero-banner]');
    if (observer && banner) observer.observe(banner);
    if (observer) observer.observe(footer);
    window.addEventListener('resize', update);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    if (!footer || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = create();
    const look = {
      ...(meta.dots ?? {}),
      lift: false,
      size: 0.65,
    };

    let elapsed = 0;
    let previous = 0;
    let lastFrame = 0;
    let stopped = false;
    let visible = true;
    const frameInterval = 1000 / meta.fps;

    const render = (time: number) => {
      const width = widthRef.current || FALLBACK_WIDTH;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cw = width / meta.cols;
      const ch = ART_HEIGHT / meta.rows;
      const bitmapWidth = Math.max(1, Math.round(width * dpr));
      const bitmapHeight = Math.max(1, Math.round(ART_HEIGHT * dpr));

      if (canvas.width !== bitmapWidth || canvas.height !== bitmapHeight) {
        canvas.width = bitmapWidth;
        canvas.height = bitmapHeight;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${ART_HEIGHT}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, ART_HEIGHT);

      paint(ctx, draw(time), meta.palette, {
        ...look,
        x: 0,
        y: 0,
        cw,
        ch,
        dpr,
        mode: 'circle',
        ink: getComputedStyle(footer).getPropertyValue('--footer-ink').trim() || '#a1a1aa',
      });
    };

    const refresh = () => render(elapsed);
    redrawRef.current = refresh;
    refresh();

    const reduceMotion =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return () => {
        stopped = true;
        redrawRef.current = null;
      };
    }

    let raf = 0;
    const loop = (now: number) => {
      if (stopped) return;
      raf = requestAnimationFrame(loop);
      if (!visible) {
        previous = now;
        return;
      }
      if (previous) elapsed += (now - previous) / 1000;
      previous = now;
      if (now - lastFrame < frameInterval) return;
      lastFrame = now - ((now - lastFrame) % frameInterval);
      refresh();
    };

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
        },
        { rootMargin: '100px' }
      );
      observer.observe(canvas);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      redrawRef.current = null;
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer-container">
      <div className="footer-strip">
        <canvas
          ref={canvasRef}
          className="footer-art"
          role="img"
          aria-label="Animated ASCII art of a lighthouse on a cliff at night"
        />
      </div>
    </footer>
  );
};

export default Footer;
