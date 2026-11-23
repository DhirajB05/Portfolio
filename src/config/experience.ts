import type { ComponentType } from 'react';

import { user } from './user-data';
import { getBrandIconComponent } from './brandIcons';

type IconComponent = ComponentType<{ className?: string }>;

export const experience = user.experience.map((exp) => ({
  id: exp.id,
  company: exp.company,
  post: exp.post,
  description: exp.description,
  duration: exp.duration,
  place: exp.place,
  logo: 'logo' in exp ? exp.logo : undefined,
  points: exp.points,
  technologies: exp.technologies.map(
    (name): { name: string; icon: IconComponent } => ({
      name,
      icon: getBrandIconComponent(name),
    })
  ),
  status: exp.status,
}));
