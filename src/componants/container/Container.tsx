import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

const containerSizes = {
  md: 'max-w-6xl',
  xl: 'max-w-7xl',
  xxl: 'max-w-[104rem]',
} as const;

export type ContainerSize = keyof typeof containerSizes;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

export default function Container({ children, className, size = 'xl' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-3.5 sm:px-4 md:px-0 lg:px-0 xl:px-0', containerSizes[size], className)}>
      {children}
    </div>
  );
}
