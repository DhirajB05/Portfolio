import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Tooltip from '../tooltip/Tooltip';

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
  return (
    <div className="project-card">
      <div className="project-banner-wrapper">
        <img src={banner} alt={name} className="project-banner" />
      </div>

      <div className="project-content">
        <div className="project-header-row">
          <h3 className="project-title">{name}</h3>

          <div className="project-badges">
            {isUnderDevelopment && <span className="badge badge-dev">In Dev</span>}
            {stats && <span className="badge badge-stats">{stats}</span>}
          </div>
        </div>

        <p className="project-desc">{desc}</p>

        <div className="project-tech-row">
          {tech.map((t, idx) => (
            <span key={idx} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-footer">
          <Tooltip text="View GitHub Repository">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <FaGithub /> <span>Code</span>
            </a>
          </Tooltip>

          {live && (
            <Tooltip text="View Live Demo">
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <FaExternalLinkAlt /> <span>Live Demo</span>
              </a>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
