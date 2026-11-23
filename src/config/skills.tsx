import type { Skill } from '@/types/common';

import { getBrandIconComponent } from './brandIcons';
import { user } from './user-data';

const allSkills = [...user.skills.technologies, ...user.skills.tools];

/**
 * Tech-stack marquee icons.
 *
 * Each icon keeps its brand colour (light/dark variants are handled by the
 * shared brand registry) so the marquee is easier to scan at a glance.
 */
export const mySkills: Skill[] = allSkills.map(({ name }) => ({
  name,
  icon: getBrandIconComponent(name),
}));
