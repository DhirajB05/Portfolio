import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-sticky">
      <div className="navbar-container">
        <Link to="/" onClick={scrollToTop} className="navbar-brand">
          <span className="navbar-brand-name">Dhiraj Bhavikatti</span>
          <span className="navbar-brand-badge">AI & Backend</span>
        </Link>

        <div className="navbar-actions">
          <a
            href="https://github.com/DhirajB05"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-action-btn"
            aria-label="GitHub Profile"
          >
            <FaGithub className="btn-icon" />
            <span className="btn-label">GitHub</span>
          </a>

          <Link to="/resume" className="navbar-action-btn" aria-label="Resume">
            <HiOutlineDocumentText className="btn-icon" />
            <span className="btn-label">Resume</span>
          </Link>

          <a
            href="mailto:dhirajbhavikatti05@gmail.com"
            className="navbar-cta-btn"
            aria-label="Contact Dhiraj"
          >
            <FaEnvelope className="btn-icon" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
