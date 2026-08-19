import React from 'react';
import { BsFillArrowThroughHeartFill } from 'react-icons/bs';
import { useVisitorCounter } from '../../hooks/useVisitorCounter';
import './Footer.css';

export const Footer: React.FC = () => {
  const { visitorCount, loading } = useVisitorCounter();

  return (
    <footer className="footer-container">
      <p className="footer-quote">
        "Debugging one life at a time... while(learning) &#123; keep_contributing(); &#125;"
      </p>

      <div className="footer-attribution">
        <span>Designed & Made with</span>
        <BsFillArrowThroughHeartFill className="heart-icon" />
        <span>by Dhiraj Bhavikatti</span>
      </div>

      <div className="visitor-counter">
        <span className="visitor-dot" />
        <span>{loading ? 'Counting visitors...' : `${visitorCount} Visitors`}</span>
      </div>
    </footer>
  );
};

export default Footer;
