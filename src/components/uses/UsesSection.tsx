import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import SectionTitle from '../sectionTitle/SectionTitle';
import { useViewport, scaleForMobile, mobileRem } from '@/hooks/useViewport';
import './UsesSection.css';

export const UsesSection: React.FC = () => {
  const { isMobile } = useViewport();

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const sectionMarginBottom = scaleForMobile(isMobile, 40);
  const cardPadding = isMobile ? '16px' : '20px';
  const titleFontSize = mobileRem(isMobile, 1);
  const descFontSize = mobileRem(isMobile, 0.85);
  const linkFontSize = mobileRem(isMobile, 0.8);
  const linkPadding = isMobile ? '10px 14px' : undefined;

  return (
    <section
      className="uses-section"
      style={{
        marginBottom: sectionMarginBottom,
      }}
    >
      <SectionTitle>Uses & Gear</SectionTitle>

      <div
        className="uses-teaser-card"
        style={{
          padding: cardPadding,
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          gap: scaleForMobile(isMobile, 16),
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div className="uses-teaser-content" style={{ display: 'flex', flexDirection: 'column', gap: scaleForMobile(isMobile, 4) }}>
          <h3
            className="uses-teaser-title"
            style={{
              fontSize: titleFontSize,
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)',
              margin: 0,
            }}
          >
            My Tech Stack, Tools & Hardware
          </h3>
          <p
            className="uses-teaser-desc"
            style={{
              fontSize: descFontSize,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            A curated list of software, AI models, hardware, and development environment setups I rely on daily.
          </p>
        </div>

        <Link
          to="/uses"
          className="view-more-link"
          onTouchStart={() => {}}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: scaleForMobile(isMobile, 6),
            padding: linkPadding,
            minHeight: isMobile ? '44px' : undefined,
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            fontSize: linkFontSize,
          }}
        >
          <span>View All</span>
          <HiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default UsesSection;
