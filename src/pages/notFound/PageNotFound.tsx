import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';

export const PageNotFound: React.FC = () => {
  return (
    <div
      className="main-content"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '8px', maxWidth: '400px', textAlign: 'center' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="composite-btn"
        style={{
          marginTop: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          fontSize: '0.85rem',
        }}
      >
        <HiArrowLeft />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default PageNotFound;
