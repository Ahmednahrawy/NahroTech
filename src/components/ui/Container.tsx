import React from 'react';
import {cn} from '../../utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer';
}

export function Container({children, className, as: Tag = 'div'}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  );
}
