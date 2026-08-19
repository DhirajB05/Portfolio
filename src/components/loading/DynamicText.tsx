import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

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

interface DynamicTextProps {
  onComplete?: () => void;
}

export const DynamicText: React.FC<DynamicTextProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          onComplete?.();
          return prevIndex;
        }

        return nextIndex;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isAnimating, onComplete]);

  // Animation variants for the text
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  return (
    <section
      aria-label="Rapid greetings in different languages"
      className="flex min-h-[200px] items-center justify-center gap-1 p-4"
      style={{
        display: 'flex',
        minHeight: '200px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="relative flex h-16 w-60 items-center justify-center overflow-visible"
        style={{
          position: 'relative',
          display: 'flex',
          height: '4rem',
          width: '15rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              animate={textVariants.visible}
              aria-live="off"
              className="absolute flex items-center gap-2 font-medium text-2xl text-gray-800 dark:text-gray-200"
              exit={textVariants.exit}
              initial={textVariants.hidden}
              key={currentIndex}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                fontSize: '1.75rem',
                color: '#ffffff',
                fontFamily: 'var(--font-ui)',
              }}
            >
              <div
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-black dark:bg-white"
                style={{
                  height: '0.5rem',
                  width: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#3b82f6',
                }}
              />
              {greetings[currentIndex].text}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div
            className="flex items-center gap-2 font-medium text-2xl text-gray-800 dark:text-gray-200"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              fontSize: '1.75rem',
              color: '#ffffff',
              fontFamily: 'var(--font-ui)',
            }}
          >
            <div
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-black dark:bg-white"
              style={{
                height: '0.5rem',
                width: '0.5rem',
                borderRadius: '9999px',
                backgroundColor: '#3b82f6',
              }}
            />
            {greetings[currentIndex].text}
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicText;
