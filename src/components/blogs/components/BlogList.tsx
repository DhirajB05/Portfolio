import React from 'react';

export const BlogOrderedList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ol style={{ paddingLeft: '20px', margin: '16px 0', color: 'var(--text-secondary)' }}>
    {items.map((item, idx) => (
      <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
    ))}
  </ol>
);

export const BlogUnorderedList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul style={{ paddingLeft: '20px', margin: '16px 0', color: 'var(--text-secondary)' }}>
    {items.map((item, idx) => (
      <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
    ))}
  </ul>
);
