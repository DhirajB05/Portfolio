import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { useViewport, scaleForMobile, mobileRem, mobilePx } from '@/hooks/useViewport';
import { useInteractionMode } from '@/hooks/useViewport';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { isMobile } = useViewport();
  const { isTouch } = useInteractionMode();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleActionTouchStart = useCallback(() => {
    if (!isMobile || !isTouch) return;
  }, [isMobile, isTouch]);

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const brandNameFontSize = mobileRem(isMobile, 0.95);
  const brandBadgeFontSize = mobileRem(isMobile, 0.68);
  const actionBtnFontSize = mobileRem(isMobile, 0.82);
  const ctaBtnFontSize = mobileRem(isMobile, 0.82);
  const actionBtnPadding = `${mobilePx(isMobile, 6)} ${mobilePx(isMobile, 12)}`;
  const ctaBtnPadding = `${mobilePx(isMobile, 6)} ${mobilePx(isMobile, 14)}`;
  const containerGap = scaleForMobile(isMobile, 12);
  const brandGap = scaleForMobile(isMobile, 8);
  const actionsGap = scaleForMobile(isMobile, 8);

  return (
    <header className="navbar-sticky">
      <div className="navbar-container" style={{ gap: containerGap }}>
        <Link
          to="/"
          onClick={scrollToTop}
          className="navbar-brand"
          style={{
            gap: brandGap,
          }}
        >
          <span
            className="navbar-brand-name"
            style={{
              fontSize: brandNameFontSize,
            }}
          >
            Dhiraj Bhavikatti
          </span>
          <span
            className="navbar-brand-badge"
            style={{
              fontSize: brandBadgeFontSize,
            }}
          >
            AI & Backend
          </span>
        </Link>

        <div className="navbar-actions" style={{ gap: actionsGap }}>
          <a
            href="https://github.com/DhirajB05"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-action-btn"
            aria-label="GitHub Profile"
            onTouchStart={handleActionTouchStart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              ...(isMobile
                ? {
                    width: '38px',
                    height: '38px',
                    minWidth: '38px',
                    minHeight: '38px',
                    padding: 0,
                  }
                : {
                    fontSize: actionBtnFontSize,
                    padding: actionBtnPadding,
                  }),
            }}
          >
            <FaGithub className="btn-icon" style={{ fontSize: isMobile ? '1.15rem' : '0.85rem' }} />
            <span className="btn-label">GitHub</span>
          </a>

          <Link
            to="/resume"
            className="navbar-action-btn"
            aria-label="Resume"
            onTouchStart={handleActionTouchStart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              ...(isMobile
                ? {
                    width: '38px',
                    height: '38px',
                    minWidth: '38px',
                    minHeight: '38px',
                    padding: 0,
                  }
                : {
                    fontSize: actionBtnFontSize,
                    padding: actionBtnPadding,
                  }),
            }}
          >
            <FaFileAlt className="btn-icon" style={{ fontSize: isMobile ? '1.15rem' : '0.85rem' }} />
            <span className="btn-label">Resume</span>
          </Link>

          <a
            href="mailto:dhirajbhavikatti05@gmail.com"
            className="navbar-cta-btn"
            aria-label="Contact Dhiraj"
            onTouchStart={handleActionTouchStart}
            style={{
              fontSize: ctaBtnFontSize,
              padding: ctaBtnPadding,
              minHeight: isMobile ? '38px' : 'auto',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaEnvelope className="btn-icon" style={{ fontSize: isMobile ? '0.85rem' : ctaBtnFontSize }} />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
