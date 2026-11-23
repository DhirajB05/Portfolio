import type { ReactNode } from 'react';

export type ProjectProps = {
  children: ReactNode;
};

export type StacksProps = {
  name: string;
  Icon: ReactNode;
};

export type LinksProps = {
  live?: string;
  githubLink?: string;
};

export type Project = {
  slug: string;
  shortTitle: string;
  tool: string;
  description: string;
  live?: string;
  githubLink?: string;
  imgUrl: string;
  stacks: StacksProps[];
  status: 'Working' | 'Building';
  about: string;
};
