import React, { useRef, useEffect, useCallback } from 'react';
import { useViewport, scaleForMobile } from '@/hooks/useViewport';

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
  const { isMobile } = useViewport();

  // ── Desktop: full canvas physics loop ──────────────────────────────────
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile, sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  // ── Mobile: lightweight GPU-accelerated CSS spark overlay ──────────────
  const mobileSparkRef = useRef<HTMLDivElement | null>(null);
  const mobileSparkSize = scaleForMobile(isMobile, sparkSize);
  const mobileDuration = scaleForMobile(isMobile, duration);

  const triggerMobileSpark = useCallback(
    (clientX: number, clientY: number) => {
      if (!isMobile) return;
      const container = mobileSparkRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const spark = document.createElement('div');
      spark.style.position = 'absolute';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${mobileSparkSize}px`;
      spark.style.height = `${mobileSparkSize}px`;
      spark.style.background = sparkColor;
      spark.style.borderRadius = '50%';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999';
      spark.style.transform = 'translate(-50%, -50%) scale(0)';
      spark.style.opacity = '0.8';
      spark.style.transition = `transform ${mobileDuration}ms ease-out, opacity ${mobileDuration}ms ease-out`;

      container.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = 'translate(-50%, -50%) scale(1.6)';
        spark.style.opacity = '0';
      });

      setTimeout(() => {
        spark.remove();
      }, mobileDuration);
    },
    [isMobile, sparkColor, mobileSparkSize, mobileDuration]
  );

  const handleMobileTouch = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isMobile) return;
      const touch = e.touches[0];
      triggerMobileSpark(touch.clientX, touch.clientY);
    },
    [isMobile, triggerMobileSpark]
  );

  return (
    <div
      style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
      ref={mobileSparkRef}
      onTouchStart={handleMobileTouch}
    >
      {!isMobile && (
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
      )}
      {children}
    </div>
  );
};

export default ClickSpark;
