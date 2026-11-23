import { getBrandIcon, resolveBrand } from './brandIcons';
import type { StacksProps } from '@/types/projects';

/**
 * Every technology name used by the project cards. The icon itself comes
 * from the shared brand registry so CSS3/HTML5/FastAPI/etc. all resolve to
 * a real, theme-aware brand mark instead of the generic code fallback.
 */
const techNames = [
  'Python',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'FastAPI',
  'Express.js',
  'Node.js',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Shadcn UI',
  'Supabase',
  'Firebase',
  'PostgreSQL',
  'Prisma',
  'LangChain',
  'DeBERTa-v3',
  'Claude API',
  'Google Gemini',
  'Google Maps API',
  'FAISS',
  'Vercel',
  'GitHub',
  'Git',
  'Postman',
  'Figma',
  'VS Code',
  'Linux',
  'Markdown',
  'Generative AI',
];

export const technologies: StacksProps[] = techNames.map((name) => ({
  name,
  Icon: getBrandIcon(name),
}));

/** Always returns an icon-bearing stack item, even for unknown names. */
export const getStackIcon = (name: string): StacksProps => ({
  name,
  Icon: getBrandIcon(name),
});

export function getStacks(names: string[]): StacksProps[] {
  return names.map(getStackIcon);
}

export { resolveBrand };
