import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { scaleForMobile } from '@/hooks/useViewport';

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
  isMobile?: boolean;
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
  isMobile = false,
}) => {
  const initial = company.charAt(0).toUpperCase();

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  // Fonts use 20% reduction (pull-cord scale) on mobile for better fit
  const cardPadding = isMobile ? '12px' : '16px';
  const logoSize = scaleForMobile(isMobile, 36);
  const companyNameFontSize = isMobile ? '0.8rem' : '0.95rem';
  const roleFontSize = isMobile ? '0.72rem' : '0.85rem';
  const datesFontSize = isMobile ? '0.64rem' : '0.75rem';
  const descFontSize = isMobile ? '0.72rem' : '0.85rem';
  const headerGap = scaleForMobile(isMobile, 12);
  const infoGap = scaleForMobile(isMobile, 12);

  return (
    <div
      className="experience-card"
      style={{
        padding: cardPadding,
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div className={`timeline-dot ${status}`} />
      <div
        className="card-header"
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          cursor: 'pointer',
          gap: headerGap,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
        }}
      >
        <div className="card-company-info" style={{ display: 'flex', alignItems: 'center', gap: infoGap }}>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={company}
              className="company-logo"
              style={{
                width: logoSize,
                height: logoSize,
                minWidth: logoSize,
                minHeight: logoSize,
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontSize: isMobile ? '0.75rem' : '0.9rem',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              className="company-logo"
              style={{
                width: logoSize,
                height: logoSize,
                minWidth: logoSize,
                minHeight: logoSize,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontSize: isMobile ? '0.75rem' : '0.9rem',
                flexShrink: 0,
              }}
            >
              {initial}
            </div>
          )}
          <div className="company-details" style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="company-name"
              style={{
                fontSize: companyNameFontSize,
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                display: 'block',
              }}
            >
              {company}
            </span>
            <span
              className="company-role"
              style={{
                fontSize: roleFontSize,
                color: 'var(--status-role, #4ade80)',
                display: 'block',
              }}
            >
              {role}
            </span>
          </div>
        </div>

        <div
          className="card-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: infoGap,
            flexShrink: 0,
          }}
        >
          <span
            className="dates-text"
            style={{
              fontSize: datesFontSize,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-dim)',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
            }}
          >
            {dates}
          </span>
          <HiChevronDown
            className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
            style={{
              color: 'var(--text-dim)',
              transition: 'transform 0.3s ease',
              transform: isExpanded ? 'rotate(180deg)' : undefined,
              flexShrink: 0,
            }}
          />
        </div>
      </div>

      {isExpanded && (
        <div
          className="card-description"
          style={{
            marginTop: scaleForMobile(isMobile, 12),
            paddingTop: scaleForMobile(isMobile, 12),
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: scaleForMobile(isMobile, 6),
            fontSize: descFontSize,
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
          }}
        >
          <ul
            style={{
              listStyleType: 'disc',
              paddingLeft: scaleForMobile(isMobile, 18),
              margin: 0,
            }}
          >
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
