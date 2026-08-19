import React, { createContext, useContext, useState } from 'react';
import { motion } from 'motion/react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface LevelStyle {
  color: string;
  fillMode: string;
  pattern: string;
}

interface HeatmapContextType {
  hoveredDay: ContributionDay | null;
  setHoveredDay: (day: ContributionDay | null) => void;
  tooltipPos: { x: number; y: number };
  setTooltipPos: (pos: { x: number; y: number }) => void;
}

const HeatmapContext = createContext<HeatmapContextType>({
  hoveredDay: null,
  setHoveredDay: () => {},
  tooltipPos: { x: 0, y: 0 },
  setTooltipPos: () => {},
});

export const HeatmapInteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <HeatmapContext.Provider value={{ hoveredDay, setHoveredDay, tooltipPos, setTooltipPos }}>
      {children}
    </HeatmapContext.Provider>
  );
};

export const HeatmapInteractionBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="heatmap-boundary-container relative w-full">{children}</div>;
};

interface HeatmapChartProps {
  data?: ContributionDay[];
  gap?: number;
  levelStyles?: readonly LevelStyle[];
  animationDuration?: number;
  animationEasing?: string;
  enterTransition?: Record<string, unknown>;
  enterStaggerScale?: number;
  children?: React.ReactNode;
}

const ChartDataContext = createContext<{
  data: ContributionDay[];
  levelStyles: readonly LevelStyle[];
  gap: number;
}>({
  data: [],
  levelStyles: [],
  gap: 2,
});

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data = [],
  gap = 2,
  levelStyles = [],
  children,
}) => {
  return (
    <ChartDataContext.Provider value={{ data, levelStyles, gap }}>
      <div className="heatmap-chart-root flex w-full flex-col gap-2 overflow-x-auto p-2">
        {children}
      </div>
    </ChartDataContext.Provider>
  );
};

export const HeatmapCells: React.FC<{ cornerRadius?: number }> = ({ cornerRadius = 2 }) => {
  const { data, levelStyles, gap } = useContext(ChartDataContext);
  const { setHoveredDay, setTooltipPos } = useContext(HeatmapContext);

  // Group data into weeks of 7 days
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  data.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const cellSize = 12;

  return (
    <div className="heatmap-cells-grid flex gap-[2px] py-1">
      {weeks.map((week, wIdx) => (
        <div key={wIdx} className="flex flex-col gap-[2px]">
          {week.map((day, dIdx) => {
            const levelIdx = Math.min(day.level || 0, levelStyles.length - 1);
            const style = levelStyles[levelIdx] || { color: '#232326' };

            return (
              <motion.div
                key={day.date || dIdx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: (wIdx * 7 + dIdx) * 0.001 }}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  borderRadius: `${cornerRadius}px`,
                  backgroundColor: style.color,
                  cursor: 'pointer',
                  margin: `${gap / 2}px`,
                }}
                onMouseEnter={(e) => {
                  setHoveredDay(day);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
                }}
                onMouseLeave={() => setHoveredDay(null)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const HeatmapXAxis: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <div className="heatmap-xaxis flex justify-between px-1 text-xs text-neutral-400">
      {months.map((m, idx) => (
        <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          {m}
        </span>
      ))}
    </div>
  );
};

export const HeatmapYAxis: React.FC = () => {
  return null;
};

export const HeatmapTooltip: React.FC = () => {
  const { hoveredDay, tooltipPos } = useContext(HeatmapContext);

  if (!hoveredDay) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${tooltipPos.x}px`,
        top: `${tooltipPos.y}px`,
        transform: 'translate(-50%, -100%)',
        backgroundColor: '#1a1b1c',
        color: '#ffffff',
        border: '1px solid #333333',
        borderRadius: '6px',
        padding: '4px 8px',
        fontSize: '0.75rem',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontWeight: 600 }}>{hoveredDay.count} contributions</span> on {hoveredDay.date}
    </div>
  );
};

export const HeatmapSeparator: React.FC<{
  groupBy?: string;
  showLabels?: boolean;
  labelClassName?: string;
  stroke?: string;
  spacing?: number;
  startOffset?: number;
}> = () => {
  return <div className="heatmap-separator my-1 border-t border-neutral-800" style={{ borderColor: 'var(--border-default)' }} />;
};

export const HeatmapLegend: React.FC<{
  align?: string;
  cellSize?: number;
  cornerRadius?: number;
  gap?: number;
  levelStyles?: readonly LevelStyle[];
}> = ({ levelStyles = [] }) => {
  return (
    <div className="heatmap-legend flex items-center justify-end gap-2 text-xs text-neutral-400" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
      <span>Less</span>
      <div className="flex gap-1">
        {levelStyles.map((style, idx) => (
          <div
            key={idx}
            style={{
              width: '11px',
              height: '11px',
              borderRadius: '2px',
              backgroundColor: style.color,
            }}
          />
        ))}
      </div>
      <span>More</span>
    </div>
  );
};
