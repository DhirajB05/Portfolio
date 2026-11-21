import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { USER } from '@/data';
import { useViewport, scaleForMobile } from '@/hooks/useViewport';
import './hire-me.css';

const ANIMATION_DURATION = 1; // seconds
const ANIMATION_REPEAT_DELAY = 1.5; // seconds

export type HireMeProps = {
  text: string[];
  avatarSrc: string;
  className?: string;
  onClick?: () => void;
};

export const HireMe: React.FC<HireMeProps> = ({ text, avatarSrc, className, onClick }) => {
  const { isMobile } = useViewport();
  const [index, setIndex] = useState<number>(0);

  // ── Bifurcated interval: desktop cadence vs mobile slowed cadence ─────
  useEffect(() => {
    if (!text || text.length === 0) return;

    const intervalMs = isMobile
      ? (ANIMATION_DURATION + ANIMATION_REPEAT_DELAY + 1) * 1000
      : (ANIMATION_DURATION + ANIMATION_REPEAT_DELAY) * 1000;

    const interval = setInterval(
      () => {
        setIndex((prevIndex) => (prevIndex + 1) % text.length);
      },
      intervalMs
    );
    return () => clearInterval(interval);
  }, [text, isMobile]);

  const entranceVariants = isMobile
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: scaleForMobile(isMobile, 0.3) },
      }
    : {
        initial: { opacity: 0, scale: 0.9, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.4 },
      };

  const bubbleVariants = isMobile
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: scaleForMobile(isMobile, 0.2) },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: {
          duration: 0.35,
          ease: 'easeOut' as const,
        },
      };

  return (
    <motion.div
      initial={entranceVariants.initial}
      animate={entranceVariants.animate}
      transition={entranceVariants.transition}
      className={cn('hire-me-container', className)}
      onClick={onClick}
      role="complementary"
      aria-label="Status message"
    >
      <div className="hire-me-bubble-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={bubbleVariants.initial}
            animate={bubbleVariants.animate}
            exit={bubbleVariants.exit}
            transition={bubbleVariants.transition}
            className="hire-me-bubble"
          >
            {text[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <img
        src={avatarSrc}
        alt="Dhiraj Bhavikatti"
        className="hire-me-avatar"
        style={{
          width: isMobile ? scaleForMobile(isMobile, 32) : undefined,
          height: isMobile ? scaleForMobile(isMobile, 32) : undefined,
        }}
      />
    </motion.div>
  );
};

export const TEXT_TO_ANIMATE = [
  "I'm Dhiraj Bhavikatti",
  'Aspiring Software Engineer',
  "Hire me, I use Next.js!",
  "Hire me, I use Agents!",
  "Hire me, I use React!",
  "Hire me, I use PostgresSQL!",
];

export const HireMeDemo: React.FC = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-base underline underline-offset-4">
        check this at bottom right!
      </h1>
      <HireMe text={TEXT_TO_ANIMATE} avatarSrc={USER.avatar} />
    </div>
  );
};

export default HireMe;
