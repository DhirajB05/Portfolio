import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

export const BlogTerminal: React.FC<{ commands: string[]; title?: string }> = ({ commands, title = 'Terminal' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands.join('\n'));
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
        <span>{title}</span>
        <button onClick={handleCopy} style={{ color: '#b3b3b3', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {copied ? <FiCheck color="#22c55e" /> : <FiCopy />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div style={{ padding: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fff', lineHeight: 1.6 }}>
        {commands.map((cmd, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: '#22c55e' }}>$</span>
            <span>{cmd}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
