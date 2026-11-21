import React from 'react';
import { BsFillArrowThroughHeartFill } from 'react-icons/bs';
import { useVisitorCounter } from '../../hooks/useVisitorCounter';
import { useViewport, scaleForMobile, mobileRem, mobilePx } from '@/hooks/useViewport';
import './Footer.css';

export const Footer: React.FC = () => {
  const { visitorCount, loading } = useVisitorCounter();
  const { isMobile } = useViewport();

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const marginTop = scaleForMobile(isMobile, 40);
  const marginBottom = scaleForMobile(isMobile, 24);
  const paddingTop = scaleForMobile(isMobile, 24);
  const gap = scaleForMobile(isMobile, 12);
  const fontSize = mobileRem(isMobile, 0.8);
  const quoteFontSize = mobileRem(isMobile, 0.85);
  const attributionGap = scaleForMobile(isMobile, 6);
  const counterFontSize = mobileRem(isMobile, 0.75);
  const counterPadding = `${mobilePx(isMobile, 4)} ${mobilePx(isMobile, 10)}`;

  return (
    <footer
      className="footer-container"
      style={{
        margin: `${marginTop}px auto ${marginBottom}px auto`,
        paddingTop: paddingTop,
        gap: gap,
        fontSize: fontSize,
      }}
    >
      <p
        className="footer-quote"
        style={{
          fontSize: quoteFontSize,
          margin: 0,
        }}
      >
        "Debugging one life at a time... while(learning) &#123; keep_contributing(); &#125;"
      </p>

      <div
        className="footer-attribution"
        style={{
          gap: attributionGap,
        }}
      >
        <span>Designed & Made with</span>
        <BsFillArrowThroughHeartFill className="heart-icon" />
        <span>by Dhiraj Bhavikatti</span>
      </div>

      <div
        className="visitor-counter"
        style={{
          gap: 6,
          fontSize: counterFontSize,
          padding: counterPadding,
        }}
      >
        <span className="visitor-dot" />
        <span>{loading ? 'Counting visitors...' : `${visitorCount} Visitors`}</span>
      </div>
    </footer>
  );
};

export default Footer;
