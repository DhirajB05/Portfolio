import React from 'react';
import { userImages } from '../../../data/images';

export const BlogAuthor: React.FC<{ name?: string; avatar?: string; children?: React.ReactNode }> = ({
  name = 'Dhiraj Bhavikatti',
  avatar = userImages.profile.avatar,
  children,
}) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-default)',
    borderRadius: '8px',
    margin: '30px 0 10px 0',
  }}>
    <img src={avatar} alt={name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{name}</strong>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{children || 'AI & Full Stack Developer'}</div>
    </div>
  </div>
);
