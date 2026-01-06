import { BookOpen } from 'lucide-react';

export const NoGuidesFound = () => {
  return (
    <div className="text-center py-16 bg-card rounded-lg border border-border">
      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-serif font-medium text-foreground mb-2">
        No guides found
      </h3>
      <p className="text-muted-foreground font-sans">
        Try adjusting your search or filter criteria
      </p>
    </div>
  )
}

