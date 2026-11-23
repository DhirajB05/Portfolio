import { ReactNode } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/DhirajB05',
    icon: <FaGithub />,
    color: '#ffffff',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/dhiraj-bhavikatti-237b96359',
    icon: <FaLinkedin />,
    color: '#0a66c2',
  },
  {
    name: 'X',
    url: 'https://x.com/DhirajB05',
    icon: <FaXTwitter />,
    color: '#1da1f2',
  },
  {
    name: 'Resume',
    url: '/resume',
    icon: <FaFileAlt />,
    color: '#f59e0b',
  },
  {
    name: 'Email',
    url: 'mailto:dhirajbhavikatti05@gmail.com',
    icon: <FaEnvelope />,
    color: '#ef4444',
  },
];
