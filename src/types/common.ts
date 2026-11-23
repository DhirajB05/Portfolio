import type { ComponentType, ReactNode, SVGProps } from 'react';

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export type SvgType = {
  className?: string;
};

type SkillIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type Skill = {
  name: string;
  icon: SkillIcon;
};

export type HeadingProps = {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3';
  className?: string;
  Icon?: ComponentType<{ className?: string }> | null;
};
