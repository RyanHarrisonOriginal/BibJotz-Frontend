import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddSectionButtonProps {
  onClick: () => void;
  className?: string;
}

export const AddSectionButton = ({ onClick, className }: AddSectionButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={`
        w-full 
        border-2 
        border-dashed 
        border-muted-foreground/30 
        hover:border-primary/50 
        hover:bg-primary/5 
        text-muted-foreground 
        hover:text-primary 
        transition-all 
        duration-200 
        h-auto 
        py-6 
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2 
        font-sans
        ${className || ''}
      `}
    >
      <div className="flex items-center gap-2">
        <Plus className="h-5 w-5" />
        <span className="font-medium">Add Section</span>
      </div>
      <span className="text-xs text-muted-foreground/70">
        Create a new study section
      </span>
    </Button>
  );
};


