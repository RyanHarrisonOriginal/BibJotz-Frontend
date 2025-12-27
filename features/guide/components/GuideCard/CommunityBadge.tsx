import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export const CommunityBadge = ({ className }: { className?: string }) => {
  return (
    <Badge 
      variant="outline" 
      className={`text-xs font-medium ${className || ''}`}
      style={{
        borderColor: 'hsl(var(--bright-cyan) / 0.5)',
        color: 'hsl(var(--bright-cyan-foreground))',
        backgroundColor: 'hsl(var(--bright-cyan) / 0.2)',
      }}
    >
      <Users className="h-3 w-3 mr-1" />
      Community
    </Badge>
  );
};

