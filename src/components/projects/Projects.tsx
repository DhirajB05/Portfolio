import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import SectionTitle from '../sectionTitle/SectionTitle';
import ProjectCard from './ProjectCard';
import { featuredProjects } from '../../data/projects';
import './Projects.css';

export const Projects: React.FC = () => {
  return (
    <section className="projects-section">
      <SectionTitle>Featured Projects</SectionTitle>

      <div className="projects-grid">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>

      <div className="view-more-container">
        <Link to="/projects" className="view-more-link">
          <span>More Projects</span>
          <HiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Projects;
