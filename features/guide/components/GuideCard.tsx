import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, User, MapPin, Heart } from 'lucide-react';
import { GuideListItem } from '../types';

type GuideCardProps = {
  guide: GuideListItem;
  onStart: (guide: GuideListItem) => void;
  currentUserName?: string;
}

const GuideCard = ({ guide, onStart, currentUserName }: GuideCardProps) => {
  const isOwn = currentUserName && guide.authorName === currentUserName;
console.log(guide);
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            {isOwn && ( 
              <Badge variant="outline" className="font-sans text-xs border-primary/50 text-primary">
                <User className="h-3 w-3 mr-1" />
                My Guide
              </Badge>
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
          <p className="text-xs text-muted-foreground font-sans">
            by {guide.authorName}
          </p>
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
      <CardContent className="space-y-4">
        <Button 
          onClick={() => onStart(guide)} 
          className="w-full font-sans"
        >
          Start Guide
        </Button>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
