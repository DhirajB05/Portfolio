import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

import WatchSpinner from '@/components/amicro/watch-spinner';

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: 'Hello', language: 'English' },
  { text: 'こんにちは', language: 'Japanese' },
  { text: 'Bonjour', language: 'French' },
  { text: 'Hola', language: 'Spanish' },
  { text: '안녕하세요', language: 'Korean' },
  { text: 'Ciao', language: 'Italian' },
  { text: 'Hallo', language: 'German' },
  { text: 'Namaste', language: 'Hindi' },
];

// Watch Spinner first, then the full greeting cycle runs for ~4s total.
const SPINNER_DURATION_MS = 1250;
const GREETING_CYCLE_MS = 4000;
const GREETING_INTERVAL_MS = GREETING_CYCLE_MS / greetings.length;

interface DynamicTextProps {
  onComplete?: () => void;
}

export const DynamicText: React.FC<DynamicTextProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'spinner' | 'greetings'>('spinner');
  const [currentIndex, setCurrentIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (phase === 'spinner') {
      const timer = window.setTimeout(() => setPhase('greetings'), SPINNER_DURATION_MS);
      return () => window.clearTimeout(timer);
    }

    const isLastGreeting = currentIndex === greetings.length - 1;
    const timer = window.setTimeout(() => {
      if (isLastGreeting) onCompleteRef.current?.();
      else setCurrentIndex((index) => index + 1);
    }, GREETING_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [phase, currentIndex]);

  return (
    <section
      aria-label="Rapid greetings in different languages"
      className="flex min-h-[200px] items-center justify-center p-4"
      style={{
        display: 'flex',
        minHeight: '200px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="relative flex h-16 w-60 items-center justify-center"
        style={{
          position: 'relative',
          display: 'flex',
          height: '4rem',
          width: '15rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {phase === 'spinner' ? (
          <motion.div
            key="spinner"
            data-loader="watch-spinner"
            aria-label="Loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute flex items-center justify-center"
          >
            <WatchSpinner />
          </motion.div>
        ) : (
          <motion.div
            key={currentIndex}
            aria-live="polite"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute flex items-center gap-2 text-2xl font-medium text-gray-800 dark:text-gray-200"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              fontSize: '1.75rem',
              color: '#ffffff',
              fontFamily: "'Satoshi', var(--font-ui), sans-serif",
            }}
          >
            <div
              aria-hidden="true"
              className="size-2 rounded-full bg-black dark:bg-white"
              style={{
                height: '0.5rem',
                width: '0.5rem',
                borderRadius: '9999px',
                backgroundColor: '#3b82f6',
              }}
            />
            {greetings[currentIndex].text}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DynamicText;
