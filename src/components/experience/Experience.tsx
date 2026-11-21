import React, { useState } from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import ExperienceCard from './ExperienceCard';
import Calendar from '../calendar/Calendar';
import { useViewport, scaleForMobile } from '@/hooks/useViewport';
import './Experience.css';

interface ExperienceData {
  company: string;
  role: string;
  dates: string;
  status: 'present' | 'past' | 'future';
  logoUrl?: string;
  description: string[];
}

const experienceEntries: ExperienceData[] = [
  {
    company: 'GDG Atria AI Hackathon',
    role: 'Hackathon Participant & Builder',
    dates: 'Apr 2026',
    status: 'past',
    description: [
      'Prototyped an AI security middleware during a 24-hour hackathon at Atria Institute of Technology, Bengaluru.',
      'Implemented a 2-stage prompt injection detection pipeline using DeBERTa-v3 and the Claude API.',
      'Built a dashboard to visualize incoming prompts, risk scores, and attack vectors in real time.',
    ],
  },
  {
    company: 'SOSC — Sahyadri Open Source Community',
    role: 'Active Open Source Member',
    dates: 'Jan 2026 - Present',
    status: 'present',
    description: [
      'Participated in collaborative open-source web and AI software engineering projects.',
      'Engaged in technical workshops, codebase reviews, and peer mentoring for open-source newcomers.',
    ],
  },
  {
    company: 'ISDC — Innovex Student Development Community',
    role: 'Active Member',
    dates: 'Feb 2026 - Present',
    status: 'present',
    description: [
      'Participated in skill development sessions and innovation challenges connecting academic theory to practical code.',
      'Collaborated on prototype web platforms and technical hackathons.',
    ],
  },
  {
    company: 'IIT Bombay Techfest 2025 (Meshmerize)',
    role: 'Autonomous Robotics Competitor',
    dates: 'Dec 2025',
    status: 'past',
    description: [
      'Competed in Meshmerize, an autonomous line-follower robot competition focused on maze mapping and optimal path navigation.',
      'Programmed sensor data processing algorithms for real-time motor control and path optimization.',
    ],
  },
];

export const Experience: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const { isMobile } = useViewport();

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const sectionMarginBottom = scaleForMobile(isMobile, 40);
  const containerGap = scaleForMobile(isMobile, 16);
  const timelineGap = scaleForMobile(isMobile, 16);
  const timelinePaddingLeft = scaleForMobile(isMobile, 20);

  return (
    <section
      className="experience-container"
      style={{
        gap: containerGap,
        marginBottom: sectionMarginBottom,
      }}
    >
      <SectionTitle>Experience & Hackathons</SectionTitle>

      <div
        className="experience-timeline"
        style={{
          gap: timelineGap,
          paddingLeft: timelinePaddingLeft,
        }}
      >
        {experienceEntries.map((entry, idx) => (
          <ExperienceCard
            key={idx}
            company={entry.company}
            role={entry.role}
            dates={entry.dates}
            status={entry.status}
            logoUrl={entry.logoUrl}
            description={entry.description}
            isExpanded={expandedIdx === idx}
            onToggle={() => toggleExpand(idx)}
            isMobile={isMobile}
          />
        ))}
      </div>

      <Calendar />
    </section>
  );
};

export default Experience;
