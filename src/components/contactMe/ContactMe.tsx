import React from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import { socialLinks } from '../../data/socialLinks';
import { useViewport, scaleForMobile, mobileRem, mobilePx } from '@/hooks/useViewport';
import './ContactMe.css';

export const ContactMe: React.FC = () => {
  const { isMobile } = useViewport();

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const sectionMarginBottom = scaleForMobile(isMobile, 40);
  const containerPadding = isMobile ? '16px' : '24px';
  const containerGap = scaleForMobile(isMobile, 16);
  const headerFontSize = mobileRem(isMobile, 1.1);
  const descFontSize = mobileRem(isMobile, 0.9);
  const linksGap = scaleForMobile(isMobile, 12);
  const linksMarginTop = scaleForMobile(isMobile, 8);
  const linkPadding = `${mobilePx(isMobile, 8)} ${mobilePx(isMobile, 14)}`;
  const linkFontSize = mobileRem(isMobile, 0.85);

  return (
    <section
      className="contact-section"
      style={{
        marginBottom: sectionMarginBottom,
      }}
    >
      <SectionTitle>Let's Connect</SectionTitle>

      <div
        className="contact-container"
        style={{
          padding: containerPadding,
          gap: containerGap,
        }}
      >
        <h3
          className="contact-header-text"
          style={{
            fontSize: headerFontSize,
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-ui)',
            margin: 0,
          }}
        >
          Get in Touch
        </h3>
        <p
          className="contact-desc"
          style={{
            fontSize: descFontSize,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          I'm always open to discussing AI security research, prompt injection defense, open-source projects, or new opportunities. Reach out via email or connect with me on socials!
        </p>

        <div
          className="contact-links-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: linksGap,
            marginTop: linksMarginTop,
            ...(isMobile ? { justifyContent: 'center' } : {}),
          }}
        >
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="contact-link-item"
              onTouchStart={() => {}}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: scaleForMobile(isMobile, 8),
                padding: linkPadding,
                minHeight: isMobile ? '44px' : undefined,
                minWidth: isMobile ? '44px' : undefined,
                borderRadius: 'var(--radius-lg)',
                fontSize: linkFontSize,
                color: 'var(--text-primary)',
              }}
            >
              <span style={{ color: link.color }}>{link.icon}</span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
