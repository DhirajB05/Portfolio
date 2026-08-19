import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import SectionTitle from '../sectionTitle/SectionTitle';
import './UsesSection.css';

export const UsesSection: React.FC = () => {
  return (
    <section className="uses-section">
      <SectionTitle>Uses & Gear</SectionTitle>

      <div className="uses-teaser-card">
        <div className="uses-teaser-content">
          <h3 className="uses-teaser-title">My Tech Stack, Tools & Hardware</h3>
          <p className="uses-teaser-desc">
            A curated list of software, AI models, hardware, and development environment setups I rely on daily.
          </p>
        </div>

        <Link to="/uses" className="view-more-link" style={{ whiteSpace: 'nowrap' }}>
          <span>View All</span>
          <HiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default UsesSection;
