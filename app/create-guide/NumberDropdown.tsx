'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NumberDropdownProps = {
  value: number;
  onChange: (value: number) => void;
  maxValue: number;
  minValue?: number;
  placeholder?: string;
  className?: string;
  columns?: number;
  enabled?: boolean;
};

export function NumberDropdown({
  value,
  onChange,
  maxValue,
  minValue = 1,
  placeholder = 'Select',
  className,
  columns,
  enabled = true,
}: NumberDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const numbers = React.useMemo(() => {
    const length = maxValue - minValue + 1;
    return Array.from({ length }, (_, i) => minValue + i);
  }, [maxValue, minValue]);

  const handleSelectNumber = React.useCallback(
    (number: number) => {
      onChange(number);
      setIsOpen(false);
      buttonRef.current?.focus();
    },
    [onChange]
  );

  const handleToggle = React.useCallback(() => {
    if (!enabled) return;
    setIsOpen((prev) => !prev);
  }, [enabled]);

  const handleButtonKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    },
    [handleToggle]
  );

  // Close dropdown when clicking outside or when disabled
  React.useEffect(() => {
    if (!enabled && isOpen) {
      setIsOpen(false);
    }
  }, [enabled, isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (maxValue < minValue) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <span className="text-muted-foreground">{placeholder}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleButtonKeyDown}
        disabled={!enabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn('truncate', !value && 'text-muted-foreground')}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && enabled && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full min-w-[200px] max-w-[90vw] sm:max-w-[400px] mt-1 bg-card border border-border rounded-md shadow-lg p-2 sm:p-3"
          style={{ backgroundColor: 'hsl(var(--popover))' }}
        >
          <div 
            className={cn(
              "grid gap-1.5 sm:gap-2 max-h-60 overflow-auto",
              !columns && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            )}
            style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
            role="listbox"
          >
            {numbers.map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => handleSelectNumber(number)}
                className={cn(
                  'px-2 py-2 sm:px-3 sm:py-2.5 text-sm font-medium rounded-md border transition-all',
                  'hover:border-primary hover:bg-accent hover:text-accent-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                  'active:scale-95',
                  value === number 
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                    : 'bg-card border-border text-foreground'
                )}
                role="option"
                aria-selected={value === number}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

