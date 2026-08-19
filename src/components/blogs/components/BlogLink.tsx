import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const BlogLink: React.FC<{ href: string; children: React.ReactNode; external?: boolean }> = ({
  href,
  children,
  external = true,
}) => (
  <a
    href={href}
    target={external ? '_blank' : '_self'}
    rel="noopener noreferrer"
    style={{ color: '#3b82f6', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
  >
    <span>{children}</span>
    {external && <FaExternalLinkAlt size={10} />}
  </a>
);

export const BlogButton: React.FC<{ href?: string; onClick?: () => void; children: React.ReactNode; icon?: React.ReactNode }> = ({
  href,
  onClick,
  children,
  icon,
}) => {
  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#1a1b1c', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}>
      {icon}
      <span>{children}</span>
    </span>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return <button onClick={onClick}>{content}</button>;
};

export const BlogButtonsContainer: React.FC<{ children: React.ReactNode; direction?: 'row' | 'column' }> = ({
  children,
  direction = 'row',
}) => (
  <div style={{ display: 'flex', flexDirection: direction, gap: '12px', margin: '20px 0' }}>
    {children}
  </div>
);
