import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const SubHeading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn('mt-2 text-base text-neutral-500', className)}>
      {children}
    </p>
  );
};

export { SubHeading };
