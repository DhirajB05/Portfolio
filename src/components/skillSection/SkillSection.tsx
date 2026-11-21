import React from 'react';
import { IconType } from 'react-icons';
import {
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaNodeJs,
} from 'react-icons/fa';
import {
  SiFastapi,
  SiExpress,
  SiLangchain,
  SiSupabase,
  SiVercel,
  SiPostman,
  SiFigma,
  SiFirebase,
} from 'react-icons/si';
import SectionTitle from '../sectionTitle/SectionTitle';
import { useViewport, scaleForMobile, mobileRem, mobilePx } from '@/hooks/useViewport';
import './SkillSection.css';

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
}

const technologies: SkillItem[] = [
  { name: 'Python', icon: FaPython, color: '#3776ab' },
  { name: 'JavaScript', icon: FaJsSquare, color: '#f7df1e' },
  { name: 'React', icon: FaReact, color: '#61dafb' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
  { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
  { name: 'LangChain', icon: SiLangchain, color: '#121212' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
  { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
];

const tools: SkillItem[] = [
  { name: 'Git', icon: FaGitAlt, color: '#f05032' },
  { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
  { name: 'VS Code', icon: FaJsSquare, color: '#007acc' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
  { name: 'Linux', icon: FaLinux, color: '#fcc624' },
  { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
];

export const SkillSection: React.FC = () => {
  const { isMobile } = useViewport();

  // ── Desktop values scaled by 0.9 on mobile only ─────────────────────────
  const sectionMarginBottom = scaleForMobile(isMobile, 40);
  const rowGap = scaleForMobile(isMobile, 12);
  const pillPadding = `${mobilePx(isMobile, 6)} ${mobilePx(isMobile, 14)}`;
  const pillFontSize = mobileRem(isMobile, 0.8);
  const pillGap = scaleForMobile(isMobile, 8);

  return (
    <section
      className="skill-section"
      style={{
        marginBottom: sectionMarginBottom,
      }}
    >
      <SectionTitle>Skills & Tech Stack</SectionTitle>

      <div
        className="marquee-container"
        style={{ gap: rowGap }}
      >
        {/* Row 1: Technologies */}
        <div className="marquee-row">
          {[...technologies, ...technologies].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                className="skill-pill"
                key={`tech-${idx}`}
                style={{
                  padding: pillPadding,
                  fontSize: pillFontSize,
                  gap: pillGap,
                  borderRadius: 'var(--radius-pill)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon
                  className="skill-icon"
                  style={{ color: item.color }}
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Row 2: Tools */}
        <div className="marquee-row reverse">
          {[...tools, ...tools].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                className="skill-pill"
                key={`tool-${idx}`}
                style={{
                  padding: pillPadding,
                  fontSize: pillFontSize,
                  gap: pillGap,
                  borderRadius: 'var(--radius-pill)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon
                  className="skill-icon"
                  style={{ color: item.color }}
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
