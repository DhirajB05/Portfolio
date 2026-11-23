import { getStackIcon } from '@/config/technologies';
import { allProjects } from './projects';
import type { Project } from '@/types/projects';

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Adapter that exposes the repo's `src/data/projects.ts` in the shape that
 * devfolio-v2's `<ProjectCard />` / `<ProjectsView />` expect.
 */
export const devfolioProjects: Project[] = allProjects.map((project) => ({
  slug: slugify(project.name),
  shortTitle: project.name,
  tool: project.tech.join(' · '),
  description: project.desc,
  live: project.live,
  githubLink: project.github,
  imgUrl: project.banner,
  stacks: project.tech.map(getStackIcon),
  status: project.isUnderDevelopment ? 'Building' : 'Working',
  about: project.stats ?? project.tech.slice(0, 2).join(' · '),
}));

export default devfolioProjects;
