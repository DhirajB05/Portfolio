import React from 'react';
import WatchSpinner from '@/components/amicro/watch-spinner';
import './Loading.css';

export const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <WatchSpinner />
    </div>
  );
};

export default Loading;
