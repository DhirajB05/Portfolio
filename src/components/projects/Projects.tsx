import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import SectionTitle from '../sectionTitle/SectionTitle';
import ProjectCard from './ProjectCard';
import { featuredProjects } from '../../data/projects';
import { useViewport, scaleForMobile, mobileRem, mobilePx } from '@/hooks/useViewport';
import './Projects.css';

export const Projects: React.FC = () => {
  const { isMobile } = useViewport();

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const sectionMarginBottom = scaleForMobile(isMobile, 40);
  const viewMorePadding = `${mobilePx(isMobile, 6)} ${mobilePx(isMobile, 14)}`;
  const viewMoreFontSize = mobileRem(isMobile, 0.8);

  return (
    <section
      className="projects-section"
      style={{
        marginBottom: sectionMarginBottom,
      }}
    >
      <SectionTitle>Featured Projects</SectionTitle>

      <div className="projects-grid">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>

      <div
        className="view-more-container"
        style={{
          justifyContent: isMobile ? 'center' : 'flex-end',
          marginTop: scaleForMobile(isMobile, 16),
        }}
      >
        <Link
          to="/projects"
          className="view-more-link"
          onTouchStart={() => {}}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: scaleForMobile(isMobile, 6),
            padding: viewMorePadding,
            minHeight: isMobile ? '44px' : undefined,
            borderRadius: 'var(--radius-sm)',
            fontSize: viewMoreFontSize,
            fontWeight: 500,
          }}
        >
          <span>More Projects</span>
          <HiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Projects;
