import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <header className="navbar-sticky">
      <div className="navbar-container">
        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Projects
          </NavLink>
          <NavLink to="/blogs" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Blogs
          </NavLink>
          <NavLink to="/uses" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Uses
          </NavLink>
          <NavLink to="/resume" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Resume
          </NavLink>
        </nav>

        <a
          href="https://github.com/DhirajB05/HackHarbour"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-star-btn"
        >
          <FaStar className="star-icon" />
          <span>Star</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
