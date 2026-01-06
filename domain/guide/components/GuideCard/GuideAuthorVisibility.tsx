import { Globe, Lock } from 'lucide-react';

interface GuideAuthorVisibilityProps {
  authorName: string;
  isPublic: boolean;
  className?: string;
}

export const GuideAuthorVisibility = ({ 
  authorName, 
  isPublic, 
  className 
}: GuideAuthorVisibilityProps) => {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className || ''}`}>
      <p className="text-xs text-muted-foreground font-sans">
        by {authorName}
      </p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {isPublic ? (
          <>
            <Globe className="h-3 w-3" />
            <span>Public</span>
          </>
        ) : (
          <>
            <Lock className="h-3 w-3" />
            <span>Private</span>
          </>
        )}
      </div>
    </div>
  );
};

