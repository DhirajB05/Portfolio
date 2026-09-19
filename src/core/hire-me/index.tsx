import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { USER } from '@/data';
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
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (!text || text.length === 0) return;
    const interval = setInterval(
      () => {
        setIndex((prevIndex) => (prevIndex + 1) % text.length);
      },
      (ANIMATION_DURATION + ANIMATION_REPEAT_DELAY) * 1000
    );
    return () => clearInterval(interval);
  }, [text?.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('hire-me-container', className)}
      onClick={onClick}
      role="complementary"
      aria-label="Status message"
    >
      <div className="hire-me-bubble-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.35,
              ease: 'easeOut',
            }}
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
      />
    </motion.div>
  );
};

export const TEXT_TO_ANIMATE = [
  "I'm Dhiraj Bhavikatti",
  "Aspiring Software Engineer",
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
