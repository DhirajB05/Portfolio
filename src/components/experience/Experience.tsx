import React, { useState } from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import ExperienceCard from './ExperienceCard';
import Calendar from '../calendar/Calendar';
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
    role: 'Lead AI Security Developer — Agentic AI Security System',
    dates: 'Apr 2026',
    status: 'past',
    description: [
      'Built an Agentic AI Security System during a 24-hour AI-focused hackathon at Atria Institute of Technology, Bengaluru.',
      'Architected a 2-stage prompt injection detection pipeline using DeBERTa-v3 and Anthropic Claude API.',
      'Designed a live dashboard to monitor real-time threat vectors and attack pattern analytics.',
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

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section className="experience-container">
      <SectionTitle>Experience & Hackathons</SectionTitle>

      <div className="experience-timeline">
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
          />
        ))}
      </div>

      <Calendar />
    </section>
  );
};

export default Experience;
