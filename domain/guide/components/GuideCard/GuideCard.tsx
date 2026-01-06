import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Button } from '@/components/ui/button';
import { BookOpen, MapPin, Heart, Trash2 } from 'lucide-react';
import { GuideListItem } from '../../types';
import { MyGuideBadge } from './MyGuideBadge';
import { CommunityBadge } from './CommunityBadge';
import { GuideAuthorVisibility } from './GuideAuthorVisibility';

type GuideCardProps = {
  guide: GuideListItem;
  onStart: (guide: GuideListItem) => void;
  onDelete?: (guideId: number) => void;
  currentUserName?: string;
}

const GuideCard = ({ guide, onStart, onDelete, currentUserName }: GuideCardProps) => {
  const isOwn = currentUserName && guide.authorName === currentUserName;
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card flex flex-col h-full">
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            {isOwn ? ( 
              <MyGuideBadge className="font-sans" />
            ) : (
              <CommunityBadge className="font-sans" />
            )}
          </div>
        </div>
        <CardTitle className="text-xl font-serif text-card-foreground">
          {guide.name}
        </CardTitle>
        <CardDescription className="font-sans text-muted-foreground">
          {guide.description}
        </CardDescription>
        <div className="mt-2 space-y-2">
          <GuideAuthorVisibility 
            authorName={guide.authorName} 
            isPublic={guide.isPublic} 
          />
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-sans flex-wrap">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{guide.numberOfSections} sections</span>
            </div>
            {guide.numberOfJourneys > 0 && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{guide.numberOfJourneys} journeys</span>
              </div>
            )}
            {guide.numberOfReflections > 0 && (
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                <span>{guide.numberOfReflections} reflections</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 mt-auto">
        <Button 
          onClick={() => onStart(guide)} 
          className="w-full font-sans"
        >
          Start Guide
        </Button>
        {isOwn && onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Deleting guide:', guide);
              onDelete(guide.id);
            }}
            className="w-full font-sans text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Guide
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GuideCard;
