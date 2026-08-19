import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DrawSignatureComponent from './DrawSignatureComponent';
import DynamicText from './DynamicText';

interface SignatureLoaderOverlayProps {
  onEnter: () => void;
}

export const SignatureLoaderOverlay: React.FC<SignatureLoaderOverlayProps> = ({ onEnter }) => {
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleFinish = () => {
    setIsSigned(true);
  };

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
          {!isSigned ? (
            <DrawSignatureComponent
              startLabel="Start Signing"
              finishLabel="Finish Signing"
              doneLabel="Signature Done"
              onFinish={handleFinish}
            />
          ) : (
            <DynamicText onComplete={handleGreetingComplete} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignatureLoaderOverlay;
