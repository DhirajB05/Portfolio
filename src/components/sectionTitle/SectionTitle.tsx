import React from 'react';
import './SectionTitle.css';

interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="section-title-wrapper">
      <h2 className="section-title-text">{children}</h2>
      <div className="section-title-line" />
    </div>
  );
};

export default SectionTitle;
