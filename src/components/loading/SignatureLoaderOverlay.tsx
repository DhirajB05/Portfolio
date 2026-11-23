import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DynamicText from './DynamicText';
// Keeps the full-screen backdrop styling for the spinner → greetings intro.
import './DrawSignatureComponent.css';

interface SignatureLoaderOverlayProps {
  onEnter: () => void;
}

export const SignatureLoaderOverlay: React.FC<SignatureLoaderOverlayProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleGreetingComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="signature-overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <DynamicText onComplete={handleGreetingComplete} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignatureLoaderOverlay;
