import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaFileAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { userImages } from '../../data/images';
import { getDailyDecoration } from '../../utils/ImageDecoration';
import Tooltip from '../tooltip/Tooltip';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const currentDecoration = getDailyDecoration();

  return (
    <section className="hero-container">
      <div className="hero-header">
        <div className="hero-avatar-wrapper">
          <img src={userImages.profile.avatar} alt="Dhiraj Bhavikatti" className="hero-avatar" />
          <img src={currentDecoration} alt="Daily decoration" className="hero-decoration" />
        </div>

        <div className="hero-info">
          <div className="hero-name-row">
            <h1 className="hero-name">Dhiraj Bhavikatti</h1>
            <a
              href="https://github.com/DhirajB05"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-handle"
            >
              @DhirajB05
            </a>
          </div>

          <div className="hero-status">
            <span className="hero-status-dot" />
            <span>Building & Learning Agentic AI Systems</span>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <GrLocation />
              <span>Mangalore, India</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="hero-bio">
        <li>Information Science & Engineering student at Sahyadri College passionate about Generative AI & Agentic Security.</li>
        <li>Active open-source contributor and hackathon builder.</li>
        <li>Building and learning Agentic AI systems, AI security middleware, RAG platforms, and full-stack web applications.</li>
      </ul>

      <div className="hero-actions">
        <a href="mailto:dhirajbhavikatti05@gmail.com" className="composite-btn hero-email-btn">
          <FaEnvelope />
          <span>Email Me</span>
        </a>

        <div className="hero-social-row">
          <Tooltip text="GitHub Profile">
            <a
              href="https://github.com/DhirajB05"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
            >
              <FaGithub />
            </a>
          </Tooltip>

          <Tooltip text="LinkedIn Profile">
            <a
              href="https://linkedin.com/in/dhiraj-bhavikatti-237b96359"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
            >
              <FaLinkedin />
            </a>
          </Tooltip>

          <Tooltip text="Twitter Profile">
            <a
              href="https://x.com/DhirajB05"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
            >
              <FaTwitter />
            </a>
          </Tooltip>

          <Tooltip text="View Resume">
            <a href="/resume" className="hero-social-icon">
              <FaFileAlt />
            </a>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
