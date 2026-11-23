import { devfolioProjects } from '@/data/devfolioProjects';

import { ProjectsView } from './ProjectsView';

const Projects = () => {
  return <ProjectsView projects={devfolioProjects} />;
};

export { Projects };
export default Projects;
