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
  SiTypescript,
  SiFastapi,
  SiExpress,
  SiLangchain,
  SiSupabase,
  SiVercel,
  SiPostman,
  SiFigma,
  SiVite,
  SiFirebase,
  SiCplusplus,
} from 'react-icons/si';
import SectionTitle from '../sectionTitle/SectionTitle';
import './SkillSection.css';

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
}

const technologies: SkillItem[] = [
  { name: 'Python', icon: FaPython, color: '#3776ab' },
  { name: 'C++', icon: SiCplusplus, color: '#00599c' },
  { name: 'JavaScript', icon: FaJsSquare, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
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
  { name: 'Vite', icon: SiVite, color: '#646cff' },
  { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
  { name: 'Linux', icon: FaLinux, color: '#fcc624' },
  { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
];

export const SkillSection: React.FC = () => {
  return (
    <section className="skill-section">
      <SectionTitle>Skills & Tech Stack</SectionTitle>

      <div className="marquee-container">
        {/* Row 1: Technologies */}
        <div className="marquee-row">
          {[...technologies, ...technologies].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div className="skill-pill" key={`tech-${idx}`}>
                <Icon className="skill-icon" style={{ color: item.color }} />
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
              <div className="skill-pill" key={`tool-${idx}`}>
                <Icon className="skill-icon" style={{ color: item.color }} />
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
