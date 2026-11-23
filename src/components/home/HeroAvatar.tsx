import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import { userImages } from '@/data/images';

import { Reveal } from '../common/Reveal';
import { SpotifyPlayer } from './SpotifyPlayer';

const LOGO = userImages.profile.avatar;
const SECONDARY_AVATAR = userImages.profile.secondaryAvatar;
const BANNER = userImages.profile.banner;

/**
 * Port of devfolio-v2 `components/home/HeroAvatar.tsx`.
 *
 * Stack adaptations:
 *  - `next/image` → plain <img> with the same fill/cover classes
 *  - `useSound` context → removed (sound toggle was intentionally dropped)
 *  - AvailableBadge + Zap/sound buttons → intentionally removed
 */
export const HeroAvatar = () => {
  const [image, setImage] = useState(LOGO);
  const [glitch, setGlitch] = useState(false);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    if (glitch) return;

    setGlitch(true);

    timersRef.current = [
      setTimeout(() => {
        setImage((prev) => (prev === LOGO ? SECONDARY_AVATAR : LOGO));
      }, 120),
      setTimeout(() => {
        setGlitch(false);
      }, 350),
    ];
  };

  // Shared avatar image and glitch effect
  const AvatarImage = (
    <div className="relative size-full overflow-hidden rounded-full shadow-xl ring-4 ring-white sm:ring-5 dark:ring-black">
      <img
        src={image}
        alt="Dhiraj Bhavikatti"
        sizes="140px"
        className="absolute inset-0 size-full rounded-full object-cover"
        onError={() => setImage(LOGO)}
      />

      <AnimatePresence>
        {glitch && (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8, x: [-6, 6, -3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image}
                alt=""
                sizes="140px"
                className="absolute inset-0 size-full object-cover"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8, x: [6, -6, 3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image}
                alt=""
                sizes="140px"
                className="absolute inset-0 size-full object-cover"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                rotate: [0, 1, -1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative">
      {/* Hero banner — looping animated GIF. Its Netscape loop extension is
          set to infinite, so the browser replays it continuously. */}
      <Reveal>
        <div className="relative z-0 mx-auto my-5 h-42 w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-xl sm:h-[calc(7.6cm+2px)] dark:border-white/10 dark:bg-neutral-900">
          <img
            data-hero-banner
            src={BANNER}
            alt="Dhiraj Bhavikatti project banner"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </Reveal>

      {/* Mobile: avatar overlaps the banner exactly like the reference. */}
      <div className="relative z-20 -mt-[67px] flex flex-col items-center md:hidden">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleClick}
            disabled={glitch}
            aria-label="Switch avatar"
            className="-ml-3 size-[114px] shrink-0 rounded-full sm:size-[125.4px]"
          >
            <Reveal delay={0.2} className="size-full">
              {AvatarImage}
            </Reveal>
          </button>
        </div>

        {/* Status badge under the avatar — keeps the reference's hero rhythm. */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-6 w-fit">
            <div className="relative flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 ring ring-neutral-400 dark:bg-neutral-900 dark:ring-neutral-700">
              <span className="relative inline-flex">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <p className="text-sm font-semibold">Open to work</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Tablet and desktop: avatar positioning remains fixed */}
      <div className="absolute -bottom-[74px] left-7 z-10 hidden size-[125.4px] md:block">
        <button
          type="button"
          onClick={handleClick}
          disabled={glitch}
          aria-label="Switch avatar"
          className="size-full rounded-full"
        >
          <Reveal delay={0.2} className="size-full">
            {AvatarImage}
          </Reveal>
        </button>
      </div>

      {/* Spotify mark shares the avatar's bottom line and drops down a player. */}
      <SpotifyPlayer />
    </div>
  );
};

export default HeroAvatar;
