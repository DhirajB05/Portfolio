import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';

interface ExperienceCardProps {
  logo?: React.ReactNode;
  logoUrl?: string;
  company: string;
  links?: { url: string; icon: React.ReactNode }[];
  status: 'present' | 'past' | 'future';
  role: string;
  dates: string;
  location?: string;
  description: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  logoUrl,
  company,
  status,
  role,
  dates,
  description,
  isExpanded,
  onToggle,
}) => {
  const initial = company.charAt(0).toUpperCase();

  return (
    <div className="experience-card">
      <div className={`timeline-dot ${status}`} />
      <div className="card-header" onClick={onToggle}>
        <div className="card-company-info">
          {logoUrl ? (
            <img src={logoUrl} alt={company} className="company-logo" />
          ) : (
            <div className="company-logo">{initial}</div>
          )}
          <div className="company-details">
            <span className="company-name">{company}</span>
            <span className="company-role">{role}</span>
          </div>
        </div>

        <div className="card-right">
          <span className="dates-text">{dates}</span>
          <HiChevronDown className={`expand-icon ${isExpanded ? 'expanded' : ''}`} />
        </div>
      </div>

      {isExpanded && (
        <div className="card-description">
          <ul>
            {description.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
