
import React from 'react';
import { cn } from '@/lib/utils';

interface SizeOptionProps {
  size: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const SizeOption: React.FC<SizeOptionProps> = ({
  size,
  selected = false,
  onClick,
  disabled = false,
  className,
}) => {
  const baseClasses = 'flex items-center justify-center w-10 h-10 border rounded-md text-sm transition-all';
  
  const variantClasses = selected
    ? 'border-primary bg-primary text-primary-foreground'
    : disabled
      ? 'border-muted-foreground/30 bg-muted/30 text-muted-foreground/50 cursor-not-allowed'
      : 'border-border hover:border-primary/50 hover:bg-primary/5';

  return (
    <button
      type="button"
      className={cn(baseClasses, variantClasses, className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Select size ${size}`}
      aria-disabled={disabled}
    >
      {size}
    </button>
  );
};

export default SizeOption;
