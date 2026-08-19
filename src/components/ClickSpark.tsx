import React, { useRef, useEffect } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children: React.ReactNode;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#ffffff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let sparks: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount;
        const speed = Math.random() * (sparkRadius / 10) + 1;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          size: sparkSize * (0.6 + Math.random() * 0.4),
        });
      }
    };

    window.addEventListener('click', handleClick);

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks = sparks.filter((spark) => spark.alpha > 0);

      sparks.forEach((spark) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.alpha -= 1 / (duration / 16);

        ctx.save();
        ctx.globalAlpha = Math.max(0, spark.alpha);
        ctx.fillStyle = sparkColor;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
