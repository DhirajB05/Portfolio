import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaFileAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { userImages } from '../../data/images';
import { getDailyDecoration } from '../../utils/ImageDecoration';
import Tooltip from '../tooltip/Tooltip';
import { useViewport, scaleForMobile, scaleForPullCord, mobileRem, mobilePx } from '@/hooks/useViewport';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const currentDecoration = getDailyDecoration();
  const { isMobile } = useViewport();

  // ── Desktop values scaled on mobile only ────────────────────────────────
  // Header components use 20% reduction (pull-cord scale) for better mobile fit
  const avatarSize = scaleForPullCord(isMobile, 125);
  const decorationSize = scaleForPullCord(isMobile, 48);
  const nameFontSize = mobileRem(isMobile, 1.5);
  const handleFontSize = mobileRem(isMobile, 0.85);
  const statusFontSize = mobileRem(isMobile, 0.85);
  const bioFontSize = mobileRem(isMobile, 0.95);
  const headerGap = scaleForPullCord(isMobile, 20);
  const sectionMarginTop = scaleForMobile(isMobile, 24);
  const sectionMarginBottom = scaleForMobile(isMobile, 40);
  const containerGap = scaleForMobile(isMobile, 20);
  const infoGap = scaleForMobile(isMobile, 4);
  const nameRowGap = scaleForMobile(isMobile, 8);
  const statusPadding = `${mobilePx(isMobile, 3)} ${mobilePx(isMobile, 8)}`;
  const metaFontSize = mobileRem(isMobile, 0.8);
  const metaGap = scaleForMobile(isMobile, 16);
  const metaMarginTop = scaleForMobile(isMobile, 4);
  const metaItemGap = scaleForMobile(isMobile, 4);
  const bioGap = scaleForMobile(isMobile, 8);
  const bioPaddingLeft = scaleForMobile(isMobile, 16);
  const actionsGap = scaleForMobile(isMobile, 12);
  const actionsMarginTop = scaleForMobile(isMobile, 10);
  const emailPadding = `${mobilePx(isMobile, 8)} ${mobilePx(isMobile, 16)}`;
  const emailFontSize = mobileRem(isMobile, 0.85);
  const socialGap = scaleForMobile(isMobile, 10);
  const socialSize = scaleForMobile(isMobile, 34);
  const socialIconFontSize = scaleForMobile(isMobile, 14);

  // ── Mobile: stack avatar above info instead of side-by-side ────────────
  const headerFlexDirection = isMobile ? 'column' : 'row';
  const headerAlignItems = isMobile ? 'center' : 'center';
  const headerTextAlign = isMobile ? 'center' : 'left';

  return (
    <section
      className="hero-container"
      style={{
        marginTop: sectionMarginTop,
        marginBottom: sectionMarginBottom,
        gap: containerGap,
      }}
    >
      <div
        className="hero-header"
        style={{
          display: 'flex',
          flexDirection: headerFlexDirection,
          alignItems: headerAlignItems,
          gap: headerGap,
          textAlign: isMobile ? 'center' : undefined,
        }}
      >
        <div
          className="hero-avatar-wrapper"
          style={{
            position: 'relative',
            width: avatarSize,
            height: avatarSize,
            flexShrink: 0,
          }}
        >
          <img
            src={userImages.profile.avatar}
            alt="Dhiraj Bhavikatti"
            className="hero-avatar"
          />
          <img
            src={currentDecoration}
            alt="Daily decoration"
            className="hero-decoration"
            style={{
              top: isMobile ? -10.8 : -12,
              right: isMobile ? -10.8 : -12,
              width: decorationSize,
              height: decorationSize,
            }}
          />
        </div>

        <div
          className="hero-info"
          style={{
            gap: infoGap,
            textAlign: headerTextAlign,
            alignItems: isMobile ? 'center' : 'flex-start',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="hero-name-row"
            style={{
              gap: isMobile ? 4 : nameRowGap,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
            }}
          >
            <h1
              className="hero-name"
              style={{
                fontSize: nameFontSize,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                margin: 0,
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Dhiraj Bhavikatti
            </h1>
            <a
              href="https://github.com/DhirajB05"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-handle"
              style={{
                fontSize: handleFontSize,
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              @DhirajB05
            </a>
          </div>

          <div
            className="hero-status"
            style={{
              fontSize: statusFontSize,
              padding: statusPadding,
              borderRadius: 'var(--radius-md)',
              width: 'fit-content',
              margin: isMobile ? '4px auto 0 auto' : undefined,
              alignSelf: isMobile ? 'center' : 'flex-start',
            }}
          >
            <span className="hero-status-dot" />
            <span>Backend & Agentic AI Explorer</span>
          </div>

          <div
            className="hero-meta"
            style={{
              fontSize: metaFontSize,
              gap: metaGap,
              marginTop: metaMarginTop,
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              justifyContent: isMobile ? 'center' : undefined,
            }}
          >
            <div className="hero-meta-item" style={{ gap: metaItemGap }}>
              <GrLocation />
              <span>Mangalore, India</span>
            </div>
          </div>
        </div>
      </div>

      <ul
        className="hero-bio"
        style={{
          fontSize: bioFontSize,
          lineHeight: 1.6,
          gap: bioGap,
          paddingLeft: 0,
          margin: 0,
        }}
      >
        <li
          style={{
            position: 'relative',
            paddingLeft: bioPaddingLeft,
          }}
        >
          Second-year Information Science student learning backend development and exploring agentic AI.
        </li>
        <li
          style={{
            position: 'relative',
            paddingLeft: bioPaddingLeft,
          }}
        >
          Building full-stack projects to understand how systems fit together end to end.
        </li>
        <li
          style={{
            position: 'relative',
            paddingLeft: bioPaddingLeft,
          }}
        >
          Open-source contributor gaining momentum — always open to collaborations in backend, AI, and developer tools.
        </li>
      </ul>

      <div
        className="hero-actions"
        style={{
          gap: actionsGap,
          flexWrap: 'wrap',
          marginTop: actionsMarginTop,
          justifyContent: isMobile ? 'center' : undefined,
        }}
      >
        <a
          href="mailto:dhirajbhavikatti05@gmail.com"
          className="composite-btn hero-email-btn"
          onTouchStart={() => {}}
          style={{
            padding: emailPadding,
            fontSize: emailFontSize,
            fontWeight: 600,
            gap: scaleForMobile(isMobile, 8),
            minHeight: isMobile ? '44px' : undefined,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <FaEnvelope />
          <span>Email Me</span>
        </a>

        <div className="hero-social-row" style={{ gap: socialGap }}>
          <Tooltip text="GitHub Profile">
            <a
              href="https://github.com/DhirajB05"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
              onTouchStart={() => {}}
              style={{
                width: socialSize,
                height: socialSize,
                minWidth: socialSize,
                minHeight: socialSize,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaGithub style={{ fontSize: socialIconFontSize }} />
            </a>
          </Tooltip>

          <Tooltip text="LinkedIn Profile">
            <a
              href="https://linkedin.com/in/dhiraj-bhavikatti-237b96359"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
              onTouchStart={() => {}}
              style={{
                width: socialSize,
                height: socialSize,
                minWidth: socialSize,
                minHeight: socialSize,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaLinkedin style={{ fontSize: socialIconFontSize }} />
            </a>
          </Tooltip>

          <Tooltip text="Twitter Profile">
            <a
              href="https://x.com/DhirajB05"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
              onTouchStart={() => {}}
              style={{
                width: socialSize,
                height: socialSize,
                minWidth: socialSize,
                minHeight: socialSize,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaTwitter style={{ fontSize: socialIconFontSize }} />
            </a>
          </Tooltip>

          <Tooltip text="View Resume">
            <a
              href="/resume"
              className="hero-social-icon"
              onTouchStart={() => {}}
              style={{
                width: socialSize,
                height: socialSize,
                minWidth: socialSize,
                minHeight: socialSize,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaFileAlt style={{ fontSize: socialIconFontSize }} />
            </a>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
