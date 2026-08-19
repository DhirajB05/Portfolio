import React from 'react';

export const BlogImage: React.FC<{ src: string; alt: string; width?: string }> = ({ src, alt, width = '100%' }) => (
  <div style={{ margin: '20px 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid #444' }}>
    <img src={src} alt={alt} style={{ width, height: 'auto', display: 'block' }} />
  </div>
);

export const BlogImages: React.FC<{ images: { src: string; alt: string }[] }> = ({ images }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: '12px', margin: '20px 0' }}>
    {images.map((img, idx) => (
      <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #444' }}>
        <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ))}
  </div>
);

export const BlogEmoji: React.FC<{ src: string; alt: string; size?: 'small' | 'medium' | 'large' }> = ({ src, alt, size = 'medium' }) => {
  const dimMap = { small: '20px', medium: '28px', large: '36px' };
  return <img src={src} alt={alt} style={{ width: dimMap[size], height: dimMap[size], display: 'inline-block', verticalAlign: 'middle' }} />;
};
