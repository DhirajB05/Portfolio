import React from 'react';

export const BlogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
    {children}
  </h1>
);

export const BlogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>
    {children}
  </h2>
);

export const BlogDesc: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
    {children}
  </p>
);

export const BlogParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
    {children}
  </p>
);
