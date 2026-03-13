
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ColorOptionProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ColorOption: React.FC<ColorOptionProps> = ({
  color,
  selected = false,
  onClick,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  const borderClasses = selected
    ? 'ring-2 ring-offset-2 ring-primary'
    : 'ring-1 ring-border hover:ring-2 hover:ring-primary/50';

  return (
    <button
      type="button"
      className={cn(
        'rounded-full relative flex items-center justify-center transition-all',
        sizeClasses[size],
        borderClasses,
        className
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
      aria-label={`Select color ${color}`}
    >
      {selected && (
        <Check 
          className={cn(
            'text-white stroke-[3]',
            size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
          )} 
        />
      )}
    </button>
  );
};

export default ColorOption;
