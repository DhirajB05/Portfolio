import { useState } from 'react';

import { Link } from 'react-router-dom';

import { LayoutGrid, TextAlignStart } from 'lucide-react';

import { ArrowUpRight } from '@/svgs/essentials/ArrowUpRight';
import { Project as ProjectIcon } from '@/svgs/essentials/Project';
import { Github } from '@/svgs/socials/Github';
import type { Project } from '@/types/projects';

import { Container } from '../common/Container';
import { Heading } from '../common/Heading';
import { Reveal } from '../common/Reveal';
import { ProjectCard } from './ProjectCard';

type ProjectsViewProps = {
  projects: (Project & { slug: string })[];
};

/**
 * Port of devfolio-v2 `components/projects/ProjectsView.tsx`.
 *
 * Stack adaptations:
 *  - `next/image` → <img>
 *  - `next/link` → react-router <Link>
 *  - per-project detail routes (`/projects/[slug]`) do not exist in this SPA,
 *    so every "read more" affordance points at the `/projects` listing page
 *  - shadcn <Button> → plain router <Link>
 */
const ProjectsView = ({ projects }: ProjectsViewProps) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <Reveal delay={0.3}>
      <Container className="mt-10">
        <div className="flex items-center justify-between">
          <Heading as="h2" Icon={<ProjectIcon className="size-6" />}>
            Projects
          </Heading>

          <div className="mt-7 flex items-center gap-5 rounded-lg">
            <button aria-label="List view" onClick={() => setView('list')}>
              <TextAlignStart className="hover:text-accent-foreground size-6 text-neutral-500" />
            </button>

            <button aria-label="Grid view" onClick={() => setView('grid')}>
              <LayoutGrid className="hover:text-accent-foreground size-6 text-neutral-500" />
            </button>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal delay={index * 0.2} key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.1}>
            <div className="mt-5 flex flex-col gap-3">
              {projects.slice(0, 4).map((project, index) => (
                <Reveal delay={index * 0.1} key={project.slug}>
                  <div className="group hover:bg-muted/30 flex flex-col rounded-xl transition-colors md:gap-4 md:p-3 sm:flex-row sm:items-center sm:p-4">
                    {/* Project image */}
                    <Link
                      to="/projects"
                      className="bg-muted relative block aspect-video w-0 shrink-0 overflow-hidden rounded-lg sm:w-40"
                    >
                      <img
                        src={project.imgUrl}
                        alt={project.shortTitle}
                        sizes="(max-width: 640px) 100vw, 160px"
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </Link>

                    {/* Project details */}
                    <div className="min-w-0 flex-1">
                      <Link to="/projects" title={project.shortTitle}>
                        <Heading
                          as="h3"
                          className="group-hover:text-muted-foreground mt-0 truncate text-lg font-medium tracking-tight whitespace-nowrap transition-colors md:mt-5"
                        >
                          {project.shortTitle}
                        </Heading>
                      </Link>

                      <p className="text-muted-foreground mt-1 line-clamp-2 max-w-sm text-sm leading-6">
                        {project.description}
                      </p>

                      <p className="text-muted-foreground mt-2 text-xs">
                        {project.tool}
                      </p>
                    </div>

                    {/* Project links */}
                    <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.shortTitle} source code`}
                        >
                          <Github className="size-4" />
                        </a>
                      )}

                      <Link
                        to="/projects"
                        className="flex items-center gap-2 opacity-0 transition duration-200 group-hover:opacity-100"
                      >
                        <ArrowUpRight className={'size-5'} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        )}

        {projects.length > 4 && (
          <div className="mt-7 flex justify-center">
            <Link
              to="/projects"
              className="border-border hover:bg-muted my-5 w-fit rounded-md border px-3 py-1.5 font-sans text-sm font-medium text-foreground transition-colors"
            >
              Show all projects
            </Link>
          </div>
        )}
      </Container>
    </Reveal>
  );
};

export { ProjectsView };
export default ProjectsView;
