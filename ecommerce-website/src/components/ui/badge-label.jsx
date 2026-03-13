
import React from 'react';
import { cn } from '@/lib/utils';

const BadgeLabel = ({
  text,
  variant = 'default',
  className,
}) => {
  const baseClasses = 'inline-block px-2 py-0.5 text-xs font-medium rounded-full';

  const variantClasses = {
    default: 'bg-secondary text-secondary-foreground',
    new: 'bg-blue-100 text-blue-800',
    sale: 'bg-red-100 text-red-800',
    featured: 'bg-amber-100 text-amber-800',
  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {text}
    </span>
  );
};

export default BadgeLabel;
