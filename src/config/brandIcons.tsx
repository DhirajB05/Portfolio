import type { ComponentType, ReactNode } from 'react';

import {
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { Bot, Brain, Code, Cpu, Lightbulb, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  ClaudeApiIcon,
  CssIcon,
  DebertaIcon,
  FaissIcon,
  FigmaIcon,
  FirebaseIcon,
  GoogleMapsIcon,
  LangchainIcon,
  LinuxIcon,
  PythonIcon,
  VsCodeIcon,
} from '@/svgs/technologies/ProvidedIcons';

type IconComponent = ComponentType<{ className?: string }>;

type Brand = {
  icon: IconComponent;
  /** Color classes for a light surface. */
  light: string;
  /** Color classes for a dark surface. */
  dark: string;
};

/**
 * Brand icons with hand-tuned colors for both themes. Pure brand black/white
 * logos are swapped for a readable tint so they never disappear into the
 * background.
 */
const brands: Record<string, Brand> = {
  Python: { icon: PythonIcon, light: 'text-[#3776AB]', dark: 'dark:text-[#FFD43B]' },
  JavaScript: { icon: SiJavascript, light: 'text-[#C8A400]', dark: 'dark:text-[#F7DF1E]' },
  React: { icon: SiReact, light: 'text-[#087EA4]', dark: 'dark:text-[#61DAFB]' },
  FastAPI: { icon: SiFastapi, light: 'text-[#009688]', dark: 'dark:text-[#2DD4BF]' },
  'Express.js': { icon: SiExpress, light: 'text-[#27272A]', dark: 'dark:text-[#E4E4E7]' },
  HTML5: { icon: SiHtml5, light: 'text-[#E34F26]', dark: 'dark:text-[#FF7043]' },
  CSS3: { icon: CssIcon, light: 'text-[#1572B6]', dark: 'dark:text-[#42A5F5]' },
  LangChain: { icon: LangchainIcon, light: 'text-[#27272A]', dark: 'dark:text-[#E4E4E7]' },
  Supabase: { icon: SiSupabase, light: 'text-[#1E9E63]', dark: 'dark:text-[#3FCF8E]' },
  Firebase: { icon: FirebaseIcon, light: 'text-[#C77F00]', dark: 'dark:text-[#FFCA28]' },
  Git: { icon: SiGit, light: 'text-[#C7331F]', dark: 'dark:text-[#F05032]' },
  GitHub: { icon: SiGithub, light: 'text-[#24292F]', dark: 'dark:text-[#E4E4E7]' },
  Vercel: { icon: SiVercel, light: 'text-[#171717]', dark: 'dark:text-[#FAFAFA]' },
  'VS Code': { icon: VsCodeIcon, light: 'text-[#007ACC]', dark: 'dark:text-[#4FC1FF]' },
  'Node.js': { icon: SiNodedotjs, light: 'text-[#3C873A]', dark: 'dark:text-[#68D391]' },
  Postman: { icon: SiPostman, light: 'text-[#D64D24]', dark: 'dark:text-[#FF6C37]' },
  Linux: { icon: LinuxIcon, light: 'text-[#A87900]', dark: 'dark:text-[#FCC624]' },
  Figma: { icon: FigmaIcon, light: 'text-[#E9422E]', dark: 'dark:text-[#F24E1E]' },
  'Next.js': { icon: SiNextdotjs, light: 'text-[#171717]', dark: 'dark:text-[#FAFAFA]' },
  TypeScript: { icon: SiTypescript, light: 'text-[#3178C6]', dark: 'dark:text-[#5A9BE8]' },
  'Tailwind CSS': { icon: SiTailwindcss, light: 'text-[#0891B2]', dark: 'dark:text-[#38BDF8]' },
  Prisma: { icon: SiPrisma, light: 'text-[#5A67D8]', dark: 'dark:text-[#9AA3F0]' },
  PostgreSQL: { icon: SiPostgresql, light: 'text-[#326791]', dark: 'dark:text-[#79B8E8]' },
  'Shadcn UI': { icon: SiShadcnui, light: 'text-[#27272A]', dark: 'dark:text-[#FAFAFA]' },
  'Google Maps API': { icon: GoogleMapsIcon, light: 'text-[#1A73E8]', dark: 'dark:text-[#6BA6FF]' },
  'Google Gemini': { icon: SiGooglegemini, light: 'text-[#6D4BC4]', dark: 'dark:text-[#B39DFF]' },
  'Claude API': { icon: ClaudeApiIcon, light: 'text-[#A64B2A]', dark: 'dark:text-[#D97757]' },
  Markdown: { icon: SiMarkdown, light: 'text-[#083F93]', dark: 'dark:text-[#83A8E8]' },
  'DeBERTa-v3': { icon: DebertaIcon, light: 'text-[#7C3AED]', dark: 'dark:text-[#A78BFA]' },
  'Generative AI': { icon: Sparkles, light: 'text-[#B45309]', dark: 'dark:text-[#FBBF24]' },
  FAISS: { icon: FaissIcon, light: 'text-[#0F766E]', dark: 'dark:text-[#2DD4BF]' },
  'Open Source': { icon: SiGithub, light: 'text-[#24292F]', dark: 'dark:text-[#E4E4E7]' },
  'Web Development': { icon: Code, light: 'text-[#2563EB]', dark: 'dark:text-[#60A5FA]' },
  AI: { icon: Brain, light: 'text-[#7C3AED]', dark: 'dark:text-[#A78BFA]' },
  Robotics: { icon: Cpu, light: 'text-[#B45309]', dark: 'dark:text-[#FBBF24]' },
  Innovation: { icon: Lightbulb, light: 'text-[#A16207]', dark: 'dark:text-[#FDE047]' },
  Arduino: { icon: Cpu, light: 'text-[#00979C]', dark: 'dark:text-[#3DC9CD]' },
  ESP32: { icon: Cpu, light: 'text-[#C2410C]', dark: 'dark:text-[#FB923C]' },
  Bot: { icon: Bot, light: 'text-[#4F46E5]', dark: 'dark:text-[#A5B4FC]' },
};

/** Normalize names such as `CSS3`, `css`, `CSS` onto one canonical entry. */
const aliases: Record<string, string> = {
  js: 'JavaScript',
  nodejs: 'Node.js',
  node: 'Node.js',
  nextjs: 'Next.js',
  'next js': 'Next.js',
  tailwind: 'Tailwind CSS',
  tailwindcss: 'Tailwind CSS',
  shadcn: 'Shadcn UI',
  css: 'CSS3',
  css3: 'CSS3',
  html: 'HTML5',
  html5: 'HTML5',
  express: 'Express.js',
  expressjs: 'Express.js',
  vscode: 'VS Code',
  'vs code': 'VS Code',
  'github api': 'GitHub',
  'google maps': 'Google Maps API',
  claude: 'Claude API',
  anthropic: 'Claude API',
  langsmith: 'LangChain',
  gemini: 'Google Gemini',
  'google gemini': 'Google Gemini',
  'generative ai': 'Generative AI',
  markdown: 'Markdown',
};

const normalize = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ');

export const resolveBrand = (name: string): Brand | undefined => {
  const key = normalize(name);
  const canonical = aliases[key] ?? name.trim();
  return brands[canonical] ?? brands[key];
};

const fallback: Brand = {
  icon: Code,
  light: 'text-neutral-600',
  dark: 'dark:text-neutral-300',
};

/** Render a brand icon directly (used for project stack pills). */
export const getBrandIcon = (name: string, className?: string): ReactNode => {
  const { icon: Icon, light, dark } = resolveBrand(name) ?? fallback;

  return <Icon className={cn('size-full', light, dark, className)} aria-hidden="true" />;
};

/** Wrap a brand icon in a component (used by the experience config). */
export const getBrandIconComponent = (name: string): IconComponent => {
  const { icon: Icon, light, dark } = resolveBrand(name) ?? fallback;

  const BrandIcon = ({ className }: { className?: string }) => (
    <Icon className={cn('size-full', light, dark, className)} aria-hidden="true" />
  );

  return BrandIcon;
};

/** Monochrome variant for the skills marquee: inherits the pill's text colour. */
export const getMonoIconComponent = (name: string): IconComponent => {
  const { icon: Icon } = resolveBrand(name) ?? fallback;

  const MonoIcon = ({ className }: { className?: string }) => (
    <Icon className={cn('size-full', className)} aria-hidden="true" />
  );

  return MonoIcon;
};
