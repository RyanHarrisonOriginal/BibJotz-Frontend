import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, User, Users } from 'lucide-react';

interface GuidesOwnershipTabsProps {
  filterOwnership: 'all' | 'mine' | 'community';
  setFilterOwnership: (value: 'all' | 'mine' | 'community') => void;
  myGuidesCount: number;
  communityGuidesCount: number;
}

export const GuidesOwnershipTabs = ({
  filterOwnership,
  setFilterOwnership,
  myGuidesCount,
  communityGuidesCount,
}: GuidesOwnershipTabsProps) => {
  return (
    <Tabs value={filterOwnership} onValueChange={(v) => setFilterOwnership(v as 'all' | 'mine' | 'community')} className="mb-6">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="all" className="gap-2">
          <BookOpen className="h-4 w-4" />
          All Guides
        </TabsTrigger>
        <TabsTrigger value="mine" className="gap-2">
          <User className="h-4 w-4" />
          My Guides
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
            {myGuidesCount}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="community" className="gap-2">
          <Users className="h-4 w-4" />
          Community
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
            {communityGuidesCount}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

