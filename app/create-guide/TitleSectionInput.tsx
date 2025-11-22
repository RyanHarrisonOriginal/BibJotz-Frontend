'use client';

import { memo } from 'react';

type TitleSectionInputProps = {
  name: string;
  description: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const CreateGuideTitleSectionInput = memo(({ name, description, onNameChange, onDescriptionChange }: TitleSectionInputProps) => {
  return (
    <div className="space-y-4">
      <input
        value={name}
        onChange={onNameChange}
        placeholder="Untitled Guide"
        className="w-full border-0 bg-transparent text-4xl font-bold font-serif outline-none placeholder:text-muted-foreground/40 focus:outline-none"
      />

      <textarea
        value={description}
        onChange={onDescriptionChange}
        placeholder="Add a description..."
        className="w-full resize-none border-0 bg-transparent text-lg text-muted-foreground outline-none placeholder:text-muted-foreground/40 focus:outline-none min-h-[80px]"
      />
    </div>
  );
});

CreateGuideTitleSectionInput.displayName = 'CreateGuideTitleSectionInput';

