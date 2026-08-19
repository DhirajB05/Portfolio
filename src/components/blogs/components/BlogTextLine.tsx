import React from 'react';

export const BlogTextLine: React.FC<{ icon?: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '6px',
    margin: '10px 0',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
  }}>
    {icon && <span>{icon}</span>}
    <div>{children}</div>
  </div>
);
