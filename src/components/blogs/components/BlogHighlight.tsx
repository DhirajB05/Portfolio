import React from 'react';

export const WhiteBoldHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
    {children}
  </span>
);

export const NormalHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)', padding: '2px 6px', borderRadius: '4px' }}>
    {children}
  </span>
);

export const CustomColorHighlight: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <span style={{ color, fontWeight: 600 }}>
    {children}
  </span>
);
