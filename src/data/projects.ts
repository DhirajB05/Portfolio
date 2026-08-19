import { userImages } from './images';

export interface ProjectData {
  banner: string;
  name: string;
  desc: string;
  tech: string[];
  github: string;
  live?: string;
  demoWarning?: boolean;
  isUnderDevelopment?: boolean;
  isPrivate?: boolean;
  stats?: string;
}

export const featuredProjects: ProjectData[] = [
  {
    banner: userImages.projects.project1,
    name: 'Agentic AI Security System',
    desc: 'An Agentic AI security middleware that detects and blocks prompt-injection attempts before reaching AI agents using a two-stage pipeline with DeBERTa-v3 and Claude API.',
    tech: ['Python', 'FastAPI', 'React', 'DeBERTa-v3', 'Claude API', 'Supabase'],
    github: 'https://github.com/DhirajB05/AgneisX-Sentinel',
    isUnderDevelopment: true,
    stats: 'AI Security Middleware',
  },
  {
    banner: userImages.projects.project2,
    name: 'Eclipse — EV Charging Platform',
    desc: 'An EV Charging Platform and Station Finder built with Express.js, Vanilla CSS, and Google Maps API featuring real-time availability tracking and slot booking.',
    tech: ['JavaScript', 'Express.js', 'Node.js', 'Google Maps API', 'CSS3'],
    github: 'https://github.com/DhirajB05/Eclipse',
    stats: '3★ GitHub',
  },
  {
    banner: userImages.projects.project3,
    name: 'AI GitHub Profile Analyzer',
    desc: 'A web application that analyzes GitHub profiles and generates AI-based humorous feedback using repository and activity data.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Vercel', 'GitHub API'],
    github: 'https://github.com/DhirajB05/OpenSprint',
    live: 'https://roast-machine-kappa.vercel.app',
    stats: 'Open Sprint 2026',
  },
  {
    banner: userImages.projects.project4,
    name: 'RAG Document Q&A',
    desc: 'A document Q&A tool that allows users to query uploaded PDFs grounded in document content using Gemini 1.5 Flash, FAISS vector search, and LangChain.',
    tech: ['Python', 'LangChain', 'Google Gemini', 'FAISS', 'LangSmith'],
    github: 'https://github.com/DhirajB05/RAG-Application',
    stats: 'Vector Search AI',
  },
];

export const additionalProjects: ProjectData[] = [
  {
    banner: userImages.projects.project5,
    name: 'Podman Downloads Mockup',
    desc: 'A pixel-perfect, branded interactive UI replica of the Podman Downloads portal featuring platform-specific installation workflows.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/DhirajB05/podman-downloads-mockup',
    live: 'https://dhirajb05.github.io/podman-downloads-mockup/',
  },
  {
    banner: userImages.projects.project6,
    name: 'CodeMinds',
    desc: 'One codebase. Five perspectives. Infinite clarity. A multi-perspective code analysis tool explaining complex algorithms.',
    tech: ['Python', 'Generative AI', 'Markdown'],
    github: 'https://github.com/DhirajB05/CodeMinds',
  },
];

export const allProjects: ProjectData[] = [...featuredProjects, ...additionalProjects];
