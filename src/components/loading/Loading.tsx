import React from 'react';
import './Loading.css';

export const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <svg className="loading-svg" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#232326"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#3b82f6"
          strokeWidth="6"
          fill="none"
          strokeDasharray="250"
          strokeDashoffset="180"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="loading-text">Initializing Dhiraj's Portfolio...</div>
    </div>
  );
};

export default Loading;
