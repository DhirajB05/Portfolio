import React from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import { socialLinks } from '../../data/socialLinks';
import './ContactMe.css';

export const ContactMe: React.FC = () => {
  return (
    <section className="contact-section">
      <SectionTitle>Let's Connect</SectionTitle>

      <div className="contact-container">
        <h3 className="contact-header-text">Get in Touch</h3>
        <p className="contact-desc">
          I'm always open to discussing AI security research, prompt injection defense, open-source projects, or new opportunities. Reach out via email or connect with me on socials!
        </p>

        <div className="contact-links-grid">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="contact-link-item"
            >
              <span style={{ color: link.color }}>{link.icon}</span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
