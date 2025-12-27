'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/Form/input';  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { Search, BookOpen, User, Users, LayoutGrid, List } from 'lucide-react';
import GuideCard from '@/features/guide/components/GuideCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import { Button } from '@/components/ui/button';
import { GuideListItem } from '@/features/guide/types';
import { useGetGuides } from '@/features/guide/hooks/useGuideApi';

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterOwnership, setFilterOwnership] = useState<'all' | 'mine' | 'community'>('all');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  // Mock current user name - would come from auth context in real app
  const currentUserName = 'John Doe';

  const guides = useGetGuides();
  console.log(guides);

  const categories = ['all', 'Theology', 'Doctrine', 'Spiritual Practices', 'Biblical Studies'];

  const filteredGuides = guides.data?.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOwnership = filterOwnership === 'all' || 
                            (filterOwnership === 'mine' && guide.authorName === currentUserName) ||
                            (filterOwnership === 'community' && guide.authorName !== currentUserName);
    return matchesSearch && matchesOwnership;
  });

  const myGuidesCount = 2;
  const communityGuidesCount = 2;

  const handleStartGuide = (guide: GuideListItem) => {
    console.log('Starting guide:', guide);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
            Available Guides
          </h2>
          <p className="text-muted-foreground font-sans">
            Structured theological studies for personal and communal growth
          </p>
        </div>

        {/* Ownership Tabs */}
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

        {/* Filters */}
        <div className="bg-card rounded-lg border border-border p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-sans"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="font-sans">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="font-sans">
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'card' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="h-8 w-8 p-0"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Guide cards */}
        {guides.data?.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-serif font-medium text-foreground mb-2">
              No guides found
            </h3>
            <p className="text-muted-foreground font-sans">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.data?.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onStart={handleStartGuide}
                currentUserName={currentUserName}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {guides.data?.map((guide) => {
              const isOwn = guide.authorName === currentUserName;

              return (
                <div
                  key={guide.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleStartGuide(guide)}
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
                        {isOwn && (
                          <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                            <User className="h-3 w-3 mr-1" />
                            My Guide
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          by {guide.authorName}
                        </span>
                      </div>
                    </div>

                    {/* Right: Meta & Action */}
                    <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {guide.numberOfSections} sections
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartGuide(guide);
                        }}
                      >
                        Start Guide
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;
