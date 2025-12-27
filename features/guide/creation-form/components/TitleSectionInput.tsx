'use client';

import { memo } from 'react';

type TitleSectionInputProps = {
  name: string;
  description: string;
  updateName: (name: string) => void;
  updateDescription: (description: string) => void;
  errors?: {
    name?: string;
    description?: string;
  };
};

export const TitleSectionInput = memo(({ name, description, updateName, updateDescription, errors }: TitleSectionInputProps) => {
  const hasNameError = !!errors?.name;
  const hasDescriptionError = !!errors?.description;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <input
          value={name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="Untitled Guide"
          className={`w-full border-0 bg-transparent text-4xl font-bold font-serif outline-none placeholder:text-muted-foreground/40 focus:outline-none transition-colors ${
            hasNameError 
              ? 'border-b-2 border-destructive focus:border-destructive' 
              : 'border-b-2 border-transparent focus:border-b-2 focus:border-primary'
          }`}
          suppressHydrationWarning
        />
        {hasNameError && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1">
        <textarea
          value={description}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="Add a description..."
          className={`w-full resize-none border-0 bg-transparent text-lg text-muted-foreground outline-none placeholder:text-muted-foreground/40 focus:outline-none min-h-[80px] transition-colors ${
            hasDescriptionError 
              ? 'border-b-2 border-destructive focus:border-destructive' 
              : 'border-b-2 border-transparent focus:border-b-2 focus:border-primary'
          }`}
          suppressHydrationWarning
        />
        {hasDescriptionError && (
          <p className="text-sm text-destructive mt-1">{errors.description}</p>
        )}
      </div>
    </div>
  );
});

TitleSectionInput.displayName = 'TitleSectionInput';

