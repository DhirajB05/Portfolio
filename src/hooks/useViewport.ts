import { useState, useEffect, useCallback } from 'react';

/**
 * Breakpoint constant matching the design system's mobile threshold (768px).
 * Desktop: >= 768px | Mobile: < 768px
 */
export const MOBILE_BREAKPOINT = 768;

/**
 * Mobile scale factor: all sizes (fonts, spacing, dimensions) are reduced
 * by 10% on mobile viewports only. Desktop values pass through unchanged.
 */
export const MOBILE_SCALE = 0.9;

/**
 * Mobile scale factor for the pull-cord hint: reduced by 20% on mobile only.
 */
export const MOBILE_SCALE_PULL_CORD = 0.8;

/**
 * Returns the value scaled by MOBILE_SCALE when on mobile, otherwise the
 * original value. Use for font sizes, padding, margins, gaps, and dimensions.
 */
export function scaleForMobile(isMobile: boolean, value: number): number {
  return isMobile ? value * MOBILE_SCALE : value;
}

/**
 * Returns the value scaled by MOBILE_SCALE_PULL_CORD (20% reduction) when on
 * mobile, otherwise the original value. Used for the pull-cord hint.
 */
export function scaleForPullCord(isMobile: boolean, value: number): number {
  return isMobile ? value * MOBILE_SCALE_PULL_CORD : value;
}

/**
 * Returns a CSS px string scaled for mobile when applicable.
 */
export function mobilePx(isMobile: boolean, px: number): string {
  return `${scaleForMobile(isMobile, px)}px`;
}

/**
 * Returns a CSS rem string scaled for mobile when applicable.
 */
export function mobileRem(isMobile: boolean, rem: number): string {
  return `${scaleForMobile(isMobile, rem)}rem`;
}

/**
 * Hook that detects viewport width via window.matchMedia.
 * Returns a boolean flag: true when viewport is mobile (< 768px).
 *
 * Desktop logic is fully isolated: isMobile === false means all heavy
 * animations, canvas loops, and hover states run exactly as before.
 */
export function useViewport(): {
  isMobile: boolean;
  isDesktop: boolean;
  width: number;
} {
  const [state, setState] = useState<{
    isMobile: boolean;
    isDesktop: boolean;
    width: number;
  }>({
    isMobile: typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT,
    isDesktop: typeof window !== 'undefined' && window.innerWidth >= MOBILE_BREAKPOINT,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  const update = useCallback(() => {
    const width = window.innerWidth;
    setState({
      isMobile: width < MOBILE_BREAKPOINT,
      isDesktop: width >= MOBILE_BREAKPOINT,
      width,
    });
  }, []);

  useEffect(() => {
    // Initial read (SSR-safe)
    update();

    // matchMedia listener for live resize
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = () => update();

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [update]);

  return state;
}

/**
 * Hook that detects whether the primary input is touch-based.
 * Listens for pointer/touch events to avoid "sticky hover" on touchscreens.
 *
 * Desktop (mouse): isTouch === false → hover states preserved exactly.
 * Mobile (touch): isTouch === true → hover states suppressed, touch handlers active.
 */
export function useInteractionMode(): {
  isTouch: boolean;
  isMouse: boolean;
} {
  const [mode, setMode] = useState<{
    isTouch: boolean;
    isMouse: boolean;
  }>({ isTouch: false, isMouse: true });

  useEffect(() => {
    let touchDetected = false;

    const handleTouchStart = () => {
      if (!touchDetected) {
        touchDetected = true;
        setMode({ isTouch: true, isMouse: false });
      }
    };

    const handleMouseMove = () => {
      if (touchDetected) return;
      setMode({ isTouch: false, isMouse: true });
    };

    // Use passive listeners for performance
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Also check pointer capabilities at mount
    const checkPointer = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setMode({ isTouch: true, isMouse: false });
      }
    };
    checkPointer();

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mode;
}
