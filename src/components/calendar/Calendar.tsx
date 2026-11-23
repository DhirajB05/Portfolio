import React, { useEffect, useState, useRef } from 'react';
import { useViewport } from '@/hooks/useViewport';
import GitHubCalendar from 'react-github-calendar';
import './Calendar.css';

export interface CalendarProps {
  /** Show the small "GitHub Contributions" heading inside the card. */
  showTitle?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({ showTitle = true }) => {
  const { isMobile } = useViewport();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return typeof document !== 'undefined'
      ? document.querySelector('.app-container')?.classList.contains('light-theme') ?? false
      : false;
  });

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    if (!appContainer) return;

    const observer = new MutationObserver(() => {
      setIsLightMode(appContainer.classList.contains('light-theme'));
    });

    observer.observe(appContainer, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // On mobile, auto-scroll to the most recent contributions on mount
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const customTheme = {
    light: ['#ebedf0', '#b0b5bc', '#70757d', '#353a40', '#000000'],
    dark: ['#1c1c1e', '#3a3a3c', '#636366', '#aeaeb2', '#ffffff'],
  };

  return (
    <div className="calendar-wrapper">
      {showTitle && <div className="calendar-title">GitHub Contributions</div>}
      <div className="calendar-grid-container" ref={scrollContainerRef}>
        <GitHubCalendar
          username="DhirajB05"
          colorScheme={isLightMode ? 'light' : 'dark'}
          blockSize={isMobile ? 12 : 14}
          blockMargin={isMobile ? 3 : 4}
          fontSize={isMobile ? 11 : 13}
          theme={customTheme}
        />
      </div>
    </div>
  );
};

export default Calendar;
