import { useCallback, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import { Spotify } from '@/svgs/socials/Spotify';

import Tooltip from '../tooltip/Tooltip';
import ProAudioPlayer from './pro-audio-player';

/**
 * Hero Spotify button and its drop-down player.
 *
 * The card itself is intentionally minimal: clicking the Spotify mark swaps in
 * the local port of the Framer "Pro Audio Podcast Player" component.
 */
const Card = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const closePlayer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closePlayer();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePlayer();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closePlayer, open]);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 bottom-6 z-30 flex md:-bottom-[74px]"
    >
      <Tooltip text={open ? 'Close player' : 'Open player'} position="top">
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          aria-label={open ? 'Close music player' : 'Open music player'}
          aria-expanded={open}
          aria-controls="hero-music-player"
          className="flex size-8 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-green)] md:size-9"
        >
          <Spotify className="size-full" />
        </button>
      </Tooltip>

      <AnimatePresence>
        {open && (
          <motion.div
            id="hero-music-player"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] origin-top-right"
          >
            <ProAudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
