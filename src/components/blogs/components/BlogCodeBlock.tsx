import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

export const BlogCodeBlock: React.FC<{ code: string; filename?: string; language?: string }> = ({
  code,
  filename,
  language = 'code',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: '#18181b',
      border: '1px solid #444',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '20px 0',
    }}>
      <div style={{
        backgroundColor: '#232326',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: '#b3b3b3',
        fontFamily: 'var(--font-mono)',
      }}>
        <span>{filename || language}</span>
        <button onClick={handleCopy} style={{ color: '#b3b3b3', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {copied ? <FiCheck color="#22c55e" /> : <FiCopy />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <pre style={{
        padding: '14px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: '#e2e8f0',
        overflowX: 'auto',
        margin: 0,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
