// src/config/user-data.ts
// Single source of truth — consolidated from your Vite + React Portfolio

import { getAssetUrl, userImages } from '@/data/images';

export const user = {
  // ── Identity ──
  name: "Dhiraj Bhavikatti",
  handle: "@DhirajB05",
  bio: "I wire up backends, build open source tools, and make AI agents that actually do stuff.",
  shortBio: "Backend & Agentic AI Explorer",
  location: "Mangalore, India",
  email: "dhirajbhavikatti05@gmail.com",

  // ── Media ──
  avatar: getAssetUrl("/images/profile/pfp-latest.jpg"),
  qrCode: getAssetUrl("/images/profile/qr-code.png"),
  resume: getAssetUrl("/resume/resume.pdf"),

  // ── Hero (Mohan S P style) ──
  hero: {
    name: "Dhiraj Bhavikatti",
    description: "I wire up backends, build open source tools, and make AI agents that actually do stuff.",
    fixedRole: "Software Developer",
    professions: [
      "Backend Developer",
      "OpenSource Contributor",
      "Agentic Ai Systems",
    ],
    accentColor: "#1D9BF0",
  },

  // ── Social Links ──
  socialLinks: [
    { id: 1, name: "GitHub", url: "https://github.com/DhirajB05", color: "#ffffff" },
    { id: 2, name: "LinkedIn", url: "https://linkedin.com/in/dhiraj-bhavikatti-237b96359", color: "#0a66c2" },
    { id: 3, name: "X", url: "https://x.com/DhirajB05", color: "#1da1f2" },
    { id: 4, name: "Resume", url: getAssetUrl("/resume/resume.pdf"), color: "#f59e0b" },
    { id: 5, name: "Mail", url: "mailto:dhirajbhavikatti05@gmail.com", color: "#ef4444" },
  ],

  // ── Experience ──
  experience: [
    {
      id: 5,
      company: "GDG on Campus SCEM",
      post: "Organizer",
      duration: "2026–27",
      place: "Mangalore, India",
      description:
        "Part of the GDG on Campus SCEM organizing team for the 2026–27 tenure, helping run community events, workshops, and developer programs.",
      points: [
        "Organized community sessions and hands-on workshops for students.",
        "Coordinated with speakers and volunteers to deliver campus developer events.",
      ],
      technologies: ["Open Source", "Web Development", "Innovation"],
      status: "present",
      logo: userImages.logos.gdg,
    },
    {
      id: 1,
      company: "GDG Atria AI Hackathon",
      post: "Hackathon Participant & Builder",
      duration: "Apr 2026",
      place: "Bengaluru, India",
      description:
        "Prototyped an AI security middleware during a 24-hour hackathon at Atria Institute of Technology, Bengaluru.",
      points: [
        "Implemented a 2-stage prompt injection detection pipeline using DeBERTa-v3 and the Claude API.",
        "Built a dashboard to visualize incoming prompts, risk scores, and attack vectors in real time.",
      ],
      technologies: ["Python", "FastAPI", "React", "DeBERTa-v3", "Claude API", "Supabase"],
      status: "past",
      logo: userImages.logos.gdg,
    },
    {
      id: 2,
      company: "SOSC — Sahyadri Open Source Community",
      post: "Active Open Source Member",
      duration: "Jan 2026 - Present",
      place: "Online",
      description:
        "Participated in collaborative open-source web and AI software engineering projects.",
      points: ["Engaged in technical workshops, codebase reviews, and peer mentoring for open-source newcomers."],
      technologies: ["Open Source", "Web Development", "AI"],
      status: "present",
      logo: userImages.logos.sosc,
    },
    {
      id: 3,
      company: "ISDC — Innovex Student Development Community",
      post: "Active Member",
      duration: "Feb 2026 - Present",
      place: "Online",
      description:
        "Participated in skill development sessions and innovation challenges connecting academic theory to practical code.",
      points: ["Collaborated on prototype web platforms and technical hackathons."],
      technologies: ["Web Development", "Innovation"],
      status: "present",
      logo: userImages.logos.isdc,
    },
    {
      id: 4,
      company: "IIT Bombay Techfest 2025 (Meshmerize)",
      post: "Autonomous Robotics Competitor",
      duration: "Dec 2025",
      place: "Mumbai, India",
      description:
        "Competed in Meshmerize, an autonomous line-follower robot competition focused on maze mapping and optimal path navigation.",
      points: ["Programmed sensor data processing algorithms for real-time motor control and path optimization."],
      technologies: ["Arduino", "ESP32", "Robotics", "Python"],
      status: "past",
    },
  ],

  // ── Skills ──
  skills: {
    technologies: [
      { name: "Python", color: "#3776ab" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "React", color: "#61dafb" },
      { name: "FastAPI", color: "#009688" },
      { name: "Express.js", color: "#ffffff" },
      { name: "HTML5", color: "#e34f26" },
      { name: "CSS3", color: "#1572b6" },
      { name: "LangChain", color: "#121212" },
      { name: "Supabase", color: "#3ecf8e" },
      { name: "Firebase", color: "#ffca28" },
    ],
    tools: [
      { name: "Git", color: "#f05032" },
      { name: "GitHub", color: "#ffffff" },
      { name: "Vercel", color: "#ffffff" },
      { name: "VS Code", color: "#007acc" },
      { name: "Node.js", color: "#339933" },
      { name: "Postman", color: "#ff6c37" },
      { name: "Linux", color: "#fcc624" },
      { name: "Figma", color: "#f24e1e" },
    ],
  },

  // ── Projects ──
  projects: [
    {
      id: 1,
      title: "Agentic AI Security System",
      shortTitle: "AI Security",
      description:
        "An Agentic AI security middleware that detects and blocks prompt-injection attempts before reaching AI agents using a two-stage pipeline with DeBERTa-v3 and Claude API.",
      stack: ["Python", "FastAPI", "React", "DeBERTa-v3", "Claude API", "Supabase"],
      github: "https://github.com/DhirajB05/AgneisX-Sentinel",
      live: null,
      image: "/images/projects/agentic-ai-security.jpg",
      status: "Building",
      date: "2026",
    },
    {
      id: 2,
      title: "Eclipse — EV Charging Platform",
      shortTitle: "Eclipse",
      description:
        "An EV Charging Platform and Station Finder built with Express.js, Vanilla CSS, and Google Maps API featuring real-time availability tracking and slot booking.",
      stack: ["JavaScript", "Express.js", "Node.js", "Google Maps API", "CSS3"],
      github: "https://github.com/DhirajB05/Eclipse",
      live: null,
      image: "/images/projects/eclipse.png",
      status: "Working",
      date: "2026",
    },
    {
      id: 3,
      title: "AI GitHub Profile Analyzer",
      shortTitle: "Roast Machine",
      description:
        "A web application that analyzes GitHub profiles and generates AI-based humorous feedback using repository and activity data.",
      stack: ["JavaScript", "HTML5", "CSS3", "Vercel", "GitHub API"],
      github: "https://github.com/DhirajB05/OpenSprint",
      live: "https://roast-machine-kappa.vercel.app",
      image: "/images/projects/ai-github-analyzer.png",
      status: "Working",
      date: "2026",
    },
    {
      id: 4,
      title: "RAG Document Q&A",
      shortTitle: "RAG Q&A",
      description:
        "A document Q&A tool that allows users to query uploaded PDFs grounded in document content using Gemini 1.5 Flash, FAISS vector search, and LangChain.",
      stack: ["Python", "LangChain", "Google Gemini", "FAISS", "LangSmith"],
      github: "https://github.com/DhirajB05/RAG-Application",
      live: null,
      image: "/images/projects/rag-document-qa.png",
      status: "Working",
      date: "2026",
    },
    {
      id: 5,
      title: "Podman Downloads Mockup",
      shortTitle: "Podman",
      description:
        "A pixel-perfect, branded interactive UI replica of the Podman Downloads portal featuring platform-specific installation workflows.",
      stack: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/DhirajB05/podman-downloads-mockup",
      live: "https://dhirajb05.github.io/podman-downloads-mockup/",
      image: "/images/projects/podman.png",
      status: "Working",
      date: "2026",
    },
    {
      id: 6,
      title: "CodeMinds",
      shortTitle: "CodeMinds",
      description:
        "One codebase. Five perspectives. Infinite clarity. A multi-perspective code analysis tool explaining complex algorithms.",
      stack: ["Python", "Generative AI", "Markdown"],
      github: "https://github.com/DhirajB05/CodeMinds",
      live: null,
      image: "/images/projects/codeminds.png",
      status: "Working",
      date: "2026",
    },
  ],

  // ── Uses / Gear ──
  uses: [
    {
      category: "Software & Tools",
      items: [
        { label: "Editor", name: "VS Code / Cursor AI", link: "https://code.visualstudio.com/" },
        { label: "Terminal", name: "Ubuntu Bash / Zsh", link: "https://ubuntu.com/" },
        { label: "AI Models", name: "Anthropic Claude 3.5 & Google Gemini 1.5", link: "https://anthropic.com/" },
        { label: "Security & ML", name: "DeBERTa-v3 & LangChain", link: "https://langchain.com/" },
        { label: "Vector DB", name: "FAISS & Supabase", link: "https://supabase.com/" },
        { label: "Backend API", name: "FastAPI & Express.js", link: "https://fastapi.tiangolo.com/" },
        { label: "Deployment", name: "Vercel & GitHub Pages", link: "https://vercel.com/" },
        { label: "API Testing", name: "Postman", link: "https://www.postman.com/" },
      ],
    },
    {
      category: "Hardware & Gear",
      items: [
        { label: "Laptop", name: "Primary Development Machine (Linux & Windows Dual Boot)" },
        { label: "Display", name: "Full HD Monitor" },
        { label: "Keyboard", name: "Tactile Mechanical Keyboard" },
        { label: "Mouse", name: "Wireless Ergonomic Optical Mouse" },
        { label: "Audio", name: "Noise-Isolating Headphones" },
        { label: "Microcontroller", name: "Arduino / ESP32 (Autonomous Robotics)" },
      ],
    },
  ],

  // ── Contact ──
  contact: {
    title: "Contact",
    desc: "I'm always open to discussing AI security research, prompt injection defense, open-source projects, or new opportunities. Reach out via email or connect with me on socials!",
  },

  // ── Footer ──
  footer: {
    quote: '"Debugging one life at a time... while(learning) { keep_contributing(); }"',
    attribution: "Designed & Made with \u2764\ufe0f by Dhiraj Bhavikatti",
  },

  // ── Nav ──
  navItems: [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Resume", href: getAssetUrl("/resume/resume.pdf") },
    { name: "Contact", href: "/contact" },
  ],

  // ── Meta / SEO ──
  meta: {
    siteName: "Dhiraj Bhavikatti",
    title: "Dhiraj Bhavikatti - Backend & AI Engineer",
    desc: "Backend & Agentic AI Explorer building digital products and exploring agentic AI.",
    url: "https://dhirajb05.github.io",
    author: {
      name: "Dhiraj Bhavikatti",
      twitter: "@DhirajB05",
      github: "DhirajB05",
      linkedin: "dhiraj-bhavikatti-237b96359",
      email: "dhirajbhavikatti05@gmail.com",
    },
    keywords: [
      "portfolio", "developer", "backend", "agentic AI", "AI security",
      "React", "Python", "FastAPI", "Dhiraj Bhavikatti",
    ],
  },
};
