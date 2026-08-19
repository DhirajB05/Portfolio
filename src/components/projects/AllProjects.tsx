import React from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import ProjectCard from './ProjectCard';
import { allProjects } from '../../data/projects';
import './Projects.css';

export const AllProjects: React.FC = () => {
  return (
    <section className="projects-section">
      <SectionTitle>All Projects ({allProjects.length})</SectionTitle>

      <div className="projects-grid">
        {allProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
};

export default AllProjects;
