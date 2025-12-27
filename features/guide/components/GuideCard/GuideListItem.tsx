import { Button } from '@/components/ui/button';
import { BookOpen, Trash2 } from 'lucide-react';
import { GuideListItem } from '@/features/guide/types';
import { MyGuideBadge } from './MyGuideBadge';
import { CommunityBadge } from './CommunityBadge';
import { GuideAuthorVisibility } from './GuideAuthorVisibility';

interface GuideListItemComponentProps {
  guide: GuideListItem;
  currentUserName: string;
  onStart: (guide: GuideListItem) => void;
  onDelete?: (guideId: number) => void;
}

export const GuideListItemComponent = ({
  guide,
  currentUserName,
  onStart,
  onDelete,
}: GuideListItemComponentProps) => {
  const isOwn = guide.authorName === currentUserName;
  
  return (
    <div
      key={guide.id}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onStart(guide)}
    >
      <div className="flex items-center gap-4">
        {/* Left: Icon */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif font-medium text-foreground truncate">
              {guide.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {guide.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {isOwn ? (
              <MyGuideBadge />
            ) : (
              <CommunityBadge />
            )}
            <GuideAuthorVisibility 
              authorName={guide.authorName} 
              isPublic={guide.isPublic} 
            />
          </div>
        </div>

        {/* Right: Meta & Action */}
        <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {guide.numberOfSections} sections
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStart(guide);
              }}
            >
              Start Guide
            </Button>
            {isOwn && onDelete ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(guide.id);
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : (
              <div className="w-[40px] h-[32px] flex-shrink-0" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

