import React, { useState, useCallback } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Tooltip from '../tooltip/Tooltip';
import { useViewport, scaleForMobile, mobileRem, mobilePx } from '@/hooks/useViewport';
import { useInteractionMode } from '@/hooks/useViewport';

interface ProjectCardProps {
  banner: string;
  name: string;
  desc: string;
  tech: string[];
  github: string;
  live?: string;
  demoWarning?: boolean;
  isUnderDevelopment?: boolean;
  isPrivate?: boolean;
  stats?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  banner,
  name,
  desc,
  tech,
  github,
  live,
  isUnderDevelopment,
  stats,
}) => {
  const { isMobile } = useViewport();
  const { isTouch } = useInteractionMode();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleTouchStart = useCallback(() => {
    if (!isMobile || !isTouch) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  }, [isMobile, isTouch]);

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const cardPadding = isMobile ? '16px' : undefined;
  const titleFontSize = mobileRem(isMobile, 1.25);
  const descFontSize = mobileRem(isMobile, 0.9);
  const techFontSize = mobileRem(isMobile, 0.8);
  const linkFontSize = mobileRem(isMobile, 0.82);
  const linkPadding = `${mobilePx(isMobile, 6)} ${mobilePx(isMobile, 12)}`;
  const bannerMaxHeight = isMobile ? scaleForMobile(isMobile, 160) : undefined;

  return (
    <div
      className="project-card"
      style={{
        padding: cardPadding,
        borderRadius: isMobile ? '12px' : undefined,
      }}
    >
      <div className="project-banner-wrapper">
        <img
          src={banner}
          alt={name}
          className="project-banner"
          style={{
            maxHeight: bannerMaxHeight,
          }}
        />
      </div>

      <div
        className="project-content"
        style={{
          gap: scaleForMobile(isMobile, 8),
        }}
      >
        <div className="project-header-row" style={{ gap: scaleForMobile(isMobile, 12), marginBottom: scaleForMobile(isMobile, 8) }}>
          <h3
            className="project-title"
            style={{
              fontSize: titleFontSize,
              fontWeight: 600,
              margin: 0,
            }}
          >
            {name}
          </h3>

          <div className="project-badges" style={{ display: 'flex', gap: scaleForMobile(isMobile, 6), flexWrap: 'wrap' }}>
            {isUnderDevelopment && (
              <span className="badge badge-dev" style={{ fontSize: techFontSize, padding: `${mobilePx(isMobile, 2)} ${mobilePx(isMobile, 6)}` }}>
                In Dev
              </span>
            )}
            {stats && (
              <span className="badge badge-stats" style={{ fontSize: techFontSize, padding: `${mobilePx(isMobile, 2)} ${mobilePx(isMobile, 6)}` }}>
                {stats}
              </span>
            )}
          </div>
        </div>

        <p
          className="project-desc"
          style={{
            fontSize: descFontSize,
            lineHeight: 1.5,
            margin: `0 0 ${scaleForMobile(isMobile, 12)}px 0`,
          }}
        >
          {desc}
        </p>

        <div className="project-tech-row" style={{ display: 'flex', gap: scaleForMobile(isMobile, 6), flexWrap: 'wrap', marginBottom: scaleForMobile(isMobile, 12) }}>
          {tech.map((t, idx) => (
            <span
              key={idx}
              className="tech-tag"
              style={{
                fontSize: techFontSize,
                padding: `${mobilePx(isMobile, 4)} ${mobilePx(isMobile, 8)}`,
                borderRadius: '6px',
                minHeight: isMobile ? scaleForMobile(isMobile, 36) : undefined,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="project-footer" style={{ display: 'flex', gap: scaleForMobile(isMobile, 10), flexWrap: 'wrap' }}>
          <Tooltip text="View GitHub Repository">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              onTouchStart={handleTouchStart}
              style={{
                fontSize: linkFontSize,
                fontWeight: 500,
                padding: linkPadding,
                minHeight: isMobile ? '44px' : 'auto',
                minWidth: isMobile ? '44px' : 'auto',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: scaleForMobile(isMobile, 6),
                opacity: (isMobile && isPressed) ? 0.7 : undefined,
                transform: (isMobile && isPressed) ? 'scale(0.96)' : undefined,
                transition: isMobile ? 'opacity 0.1s ease, transform 0.1s ease' : undefined,
              }}
            >
              <FaGithub style={{ fontSize: linkFontSize }} /> <span>Code</span>
            </a>
          </Tooltip>

          {live && (
            <Tooltip text="View Live Demo">
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                onTouchStart={handleTouchStart}
                style={{
                  fontSize: linkFontSize,
                  fontWeight: 500,
                  padding: linkPadding,
                  minHeight: isMobile ? '44px' : 'auto',
                  minWidth: isMobile ? '44px' : 'auto',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: scaleForMobile(isMobile, 6),
                  opacity: (isMobile && isPressed) ? 0.7 : undefined,
                  transform: (isMobile && isPressed) ? 'scale(0.96)' : undefined,
                  transition: isMobile ? 'opacity 0.1s ease, transform 0.1s ease' : undefined,
                }}
              >
                <FaExternalLinkAlt style={{ fontSize: linkFontSize }} /> <span>Live Demo</span>
              </a>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
