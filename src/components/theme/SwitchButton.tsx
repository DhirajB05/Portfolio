import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export interface SwitchButtonProps {
  onThemeChange: (theme: string) => void;
  theme: 'dark' | 'light';
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({
  onThemeChange,
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
      className="composite-btn"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
};
