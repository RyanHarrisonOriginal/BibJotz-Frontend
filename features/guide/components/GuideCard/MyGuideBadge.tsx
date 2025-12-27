import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export const MyGuideBadge = ({ className }: { className?: string }) => {
  return (
    <Badge variant="outline" className={`text-xs border-primary/50 text-primary ${className || ''}`}>
      <User className="h-3 w-3 mr-1" />
      My Guide
    </Badge>
  );
};

