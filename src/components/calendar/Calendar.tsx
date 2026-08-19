import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import './Calendar.css';

export const Calendar: React.FC = () => {
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

  const customTheme = {
    light: ['#ebedf0', '#b0b5bc', '#70757d', '#353a40', '#000000'],
    dark: ['#1c1c1e', '#3a3a3c', '#636366', '#aeaeb2', '#ffffff'],
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-title">GitHub Contributions</div>
      <div className="calendar-grid-container">
        <GitHubCalendar
          username="DhirajB05"
          colorScheme={isLightMode ? 'light' : 'dark'}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          theme={customTheme}
        />
      </div>
    </div>
  );
};

export default Calendar;
