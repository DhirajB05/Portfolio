import type { ComponentType } from 'react';

import { user } from './user-data';

import { Github } from '@/svgs/socials/Github';
import { Instagram } from '@/svgs/socials/Instagram';
import { LinkedIn } from '@/svgs/socials/LinkedIn';
import { Mail } from '@/svgs/socials/Mail';
import { Medium } from '@/svgs/socials/Medium';
import { Pinterest } from '@/svgs/socials/Pinterest';
import { Resume } from '@/svgs/socials/Resume';
import { X } from '@/svgs/socials/X';
import { YouTubeIcon } from '@/svgs/socials/YouTube';

type IconComponent = ComponentType<{ className?: string }>;

// Keys are lower-cased so names such as "GitHub" and "Github" both resolve.
const iconMap: Record<string, IconComponent> = {
  github: Github,
  instagram: Instagram,
  linkedin: LinkedIn,
  mail: Mail,
  email: Mail,
  medium: Medium,
  pinterest: Pinterest,
  resume: Resume,
  x: X,
  youtube: YouTubeIcon,
  youtubeicon: YouTubeIcon,
};

export type HeroSocialLink = {
  id: number;
  name: string;
  icon: IconComponent;
  value: string;
};

export const heroConfig = {
  name: user.hero.name,
  description: user.hero.description,
  fixedRole: user.hero.fixedRole,
  professions: user.hero.professions,
  accentColor: user.hero.accentColor,
  socialLinks: user.socialLinks.map(
    (link): HeroSocialLink => ({
      id: link.id,
      name: link.name,
      icon: iconMap[link.name.toLowerCase()] ?? Mail,
      value: link.url,
    })
  ),
};
