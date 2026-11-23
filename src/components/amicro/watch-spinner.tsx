import { motion } from 'motion/react';

/**
 * Watch Spinner from the @amicro shadcn registry.
 *
 * The registry version imports `framer-motion`; this project already ships
 * `motion`, so the import is mapped to `motion/react` to avoid a new package.
 */
export const WatchSpinner = () => (
  <div className="relative flex h-12 w-12 items-center justify-center">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border-[3px] border-transparent border-t-zinc-800 dark:border-t-white"
        style={{ width: 44 - i * 12, height: 44 - i * 12 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

export default WatchSpinner;
