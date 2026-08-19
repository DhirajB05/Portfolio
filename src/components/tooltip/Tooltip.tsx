import React, { forwardRef } from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ text, position = 'top', children, className = '' }, ref) => {
    return (
      <div className={`tooltip-container ${className}`} ref={ref}>
        {children}
        <div className={`tooltip-bubble ${position}`}>{text}</div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
