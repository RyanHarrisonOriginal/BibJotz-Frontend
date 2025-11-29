'use client';

import { memo } from 'react';

type TitleSectionInputProps = {
  name: string;
  description: string;
  updateName: (name: string) => void;
  updateDescription: (description: string) => void;
};

export const TitleSectionInput = memo(({ name, description, updateName, updateDescription }: TitleSectionInputProps) => {
  return (
    <div className="space-y-4">
      <input
        value={name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Untitled Guide"
        className="w-full border-0 bg-transparent text-4xl font-bold font-serif outline-none placeholder:text-muted-foreground/40 focus:outline-none"
        suppressHydrationWarning
      />

      <textarea
        value={description}
        onChange={(e) => updateDescription(e.target.value)}
        placeholder="Add a description..."
        className="w-full resize-none border-0 bg-transparent text-lg text-muted-foreground outline-none placeholder:text-muted-foreground/40 focus:outline-none min-h-[80px]"
        suppressHydrationWarning
      />
    </div>
  );
});

TitleSectionInput.displayName = 'TitleSectionInput';

