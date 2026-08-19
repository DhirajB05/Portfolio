import React from 'react';

interface BlogAlertProps {
  title?: string;
  children: React.ReactNode;
}

export const BlogTip: React.FC<BlogAlertProps> = ({ title = 'Tip', children }) => (
  <div style={{
    backgroundColor: 'rgba(34,197,94,0.05)',
    borderLeft: '4px solid #22c55e',
    color: '#86efac',
    padding: '12px 16px',
    borderRadius: '4px',
    margin: '16px 0',
  }}>
    <strong style={{ display: 'block', color: '#22c55e', marginBottom: '4px' }}>💡 {title}</strong>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{children}</div>
  </div>
);

export const BlogWarn: React.FC<BlogAlertProps> = ({ title = 'Warning', children }) => (
  <div style={{
    backgroundColor: 'rgba(251,191,36,0.05)',
    borderLeft: '4px solid #fbbf24',
    color: '#fde047',
    padding: '12px 16px',
    borderRadius: '4px',
    margin: '16px 0',
  }}>
    <strong style={{ display: 'block', color: '#fbbf24', marginBottom: '4px' }}>⚠️ {title}</strong>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{children}</div>
  </div>
);

export const BlogDontDo: React.FC<BlogAlertProps> = ({ title = "Don't Do This", children }) => (
  <div style={{
    backgroundColor: 'rgba(239,68,68,0.05)',
    borderLeft: '4px solid #ef4444',
    color: '#fca5a5',
    padding: '12px 16px',
    borderRadius: '4px',
    margin: '16px 0',
  }}>
    <strong style={{ display: 'block', color: '#ef4444', marginBottom: '4px' }}>🚫 {title}</strong>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{children}</div>
  </div>
);
